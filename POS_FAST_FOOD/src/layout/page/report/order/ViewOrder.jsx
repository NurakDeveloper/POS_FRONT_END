
import { useEffect, useState } from 'react';
import '../report.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { listOrder } from '../../../../api/Order';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
const ViewOrder = () => {
    const goto = useNavigate();
    const [order, setOrder] = useState([]);
    useEffect(() => {
        listOrder().then((response) => {
            setOrder(response.data);
        })
    }, []);
    const ExportExcel = (data, fileName) => {
        // 1. Convert data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // 2. Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // 3. Write the workbook to an Excel file
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };
    const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    function menu() {
        return (
            <>
                <div className="w-100 ">
                    <div className="d-flex px-2 py-3 rounded">
                        <div className='d-flex start w-50'>
                            <Link className="btn btn-success box-shadow px-3" to='/create-item'>
                                <span className='pe-2'><i class="fa-solid fa-circle-plus"></i></span>
                                <span className=''>New</span>
                            </Link>
                            <div class="btn-group ms-3" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-outline-secondary"><span className='pe-2'><i class="fa-solid fa-print"></i></span>Print</button>
                                <button type="button" class="btn btn-outline-secondary" onClick={() => ExportExcel(order, "order_data")}><span className='pe-2'><i class="fa-solid fa-file-export"></i></span>Export</button>
                            </div>

                        </div>
                        <div className='d-flex end w-50'>
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-outline-secondary" ><span className='pe-2'><i class="fa-solid fa-list"></i></span> List</button>
                                <button type="button" class="btn btn-outline-secondary" > <span className='pe-2'><i class="fa-brands fa-microsoft"></i></span>Card</button>
                            </div>
                        </div>


                    </div>
                </div>
            </>
        )
    }
    const simpleFormatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "yyyy-mm-dd"); // 'dd' for day, 'MMMM' for full month, 'yy' for year
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en', {
            weekday: 'long',   // Full day of the week (e.g., "Monday")
            day: '2-digit',    // Two-digit day (e.g., "07")
            month: 'numeric',     // Full month name (e.g., "November")
            year: 'numeric'    // Full year (e.g., "2024")
        }).format(date); // 'dd' for day, 'MMMM' for full month, 'yy' for year
    };
    return (
        <>
            {menu()}
            <div className="card border-0">
                <div className="card-body p-0 border">
                    <table className="table table-striped table-hover">
                        <thead valign='middle'>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" className='rounded-0 border pointer px-3' id="" />
                                </td>
                                <td className='py-3'>No</td>
                                <td>Invoice</td>
                                <td>OrderType</td>
                                <td>TotalAmount</td>
                                <td>Cash</td>
                                <td>Exchange</td>
                                <td>OrderTime</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                order.map((u, i) =>
                                    <tr className="pointer" onClick={() => goto(`/order-detail/${u.id}`)}>
                                        <td>
                                            <input type="checkbox" name="" className='rounded-0 border px-3' id="" />
                                        </td>
                                        <td className='py-3'>{i + 1}</td>
                                        <td>{u.id.toString().padStart(5, '0')}</td>
                                        <td> POS</td>
                                        <td>{formatCurrency.format(u.totalAmount)}</td>
                                        <td>{formatCurrency.format(u.cash)}</td>
                                        <td>{formatCurrency.format(u.exchange)}</td>
                                        <td>{formatDate(u.orderDate)}</td>
                                        <td>{u.description}</td>



                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>

        </>
    )
}





export default ViewOrder
