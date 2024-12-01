
import { useEffect, useState } from 'react';
import '../report.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { listOrder } from '../../../../api/Order';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { FaFileExcel, FaFilter, FaPlus, FaPrint, FaSearch } from 'react-icons/fa';
import { Th } from '../../../../components/table/DataGrid';
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
            <div className="list-header-container">
                {/* Left Section */}
                <div className="list-header-left">
                    {/* Add New Button */}
                    <button className="list-header-button add-new box-shadow" onClick={() => goto('/create-item')}>
                        <FaPlus className="list-header-icon" />
                        Add New
                    </button>
                    <button className="list-header-button print box-shadow">
                        <FaPrint className="list-header-icon" />
                        Print
                    </button>

                    {/* Export Button */}
                    <button className="list-header-button export box-shadow" onClick={() => ExportExcel(order, "order_data")}>
                        <FaFileExcel className="list-header-icon" />
                        Export
                    </button>

                    {/* Search Input */}

                </div>
                <div className="list-header-right">
                    <div className="list-header-search">
                        <FaSearch className="list-header-icon search-icon" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="list-header-input"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="list-header-right">

                    {/* Filter Button */}
                    <button className="list-header-button filter box-shadow">
                        <FaFilter className="list-header-icon" />
                        Filter
                    </button>
                </div>
            </div>
        );
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
                    <table className="">
                        <thead valign='middle'>
                            <tr>

                                <Th resizable>
                                    <input type="checkbox" name="" className='rounded-0 border pointer px-3' id="" />
                                </Th>
                                <Th resizable className='py-3'>No</Th>
                                <Th resizable>Invoice</Th>
                                <Th resizable>OrderType</Th>
                                <Th resizable>TotalAmount</Th>
                                <Th resizable>Cash</Th>
                                <Th resizable>Exchange</Th>
                                <Th resizable>OrderTime</Th>
                                <Th resizable>Description</Th>
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
