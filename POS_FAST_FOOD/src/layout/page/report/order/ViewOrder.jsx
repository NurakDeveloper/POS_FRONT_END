
import { useEffect, useState } from 'react';
import '../report.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { listOrder } from '../../../../api/Order';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { FaFileExcel, FaFilter, FaPlus, FaPrint, FaSearch } from 'react-icons/fa';
import { Th } from '../../../../components/table/DataGrid';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
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
    const rowsPerPage = 15; // Define how many rows to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index of the first and last item on the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Slice the categories array to display only the current page's rows
    const currentData = order.slice(startIndex, endIndex);

    // Total number of pages
    const totalPages = Math.ceil(order.length / rowsPerPage);
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

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
                    <span className="page-info f-14 text-secondary">
                        {currentPage} / {totalPages}
                    </span>
                    <div className="pagination">
                        <div className='pe-2'>
                            <button
                                className="button previous"
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                            >
                                <SlArrowLeft />
                            </button>
                        </div>

                        <button
                            className="button next"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            <SlArrowRight />
                        </button>
                    </div>

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

                                currentData.map((u, i) =>
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
