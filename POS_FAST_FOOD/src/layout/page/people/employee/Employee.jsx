import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllEmployee } from '../../../../api/EmployeeApi';
import { getAllBranch } from '../../../../api/Branch';
import * as XLSX from 'xlsx';
import { el } from 'date-fns/locale';
import { DataGrid, Tbody, Td, Th, Thead, Tr } from '../../../../components/table/DataGrid'
import { FaPlus, FaSearch, FaPrint, FaFileExport, FaFilter, FaThList, FaThLarge, FaUserEdit } from "react-icons/fa";
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { hostName } from '../../../../api/host';
const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const [branch, setBranch] = useState([]);
    const domainName = hostName();
    const imageUrl = `http://${domainName}:8085/api/images/`
    function getEmployee() {
        getAllEmployee().then((response) => {
            setEmployee(response.data);
            console.log(response.data);

        }).catch(error => {
            console.error(error);
        })
    }
    function getBranch() {
        getAllBranch().then((response) => {
            setBranch(response.data);
            console.log(response.data);

        }).catch(error => {
            console.error(error);
        })
    }
    function findBranchName(id) {
        const objBracnh = branch.find(b => b.id == id);
        if (objBracnh) {
            return objBracnh.branchName;
        } else {
            return "No Branch"
        }

    }
    const ExportExcel = (data, fileName) => {
        // 1. Convert data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // 2. Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // 3. Write the workbook to an Excel file
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sortedData = [...employee].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setEmployee(sortedData);
    };
    const rowsPerPage = 15; // Define how many rows to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index of the first and last item on the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Slice the categories array to display only the current page's rows
    const currentData = employee.slice(startIndex, endIndex);

    // Total number of pages
    const totalPages = Math.ceil(employee.length / rowsPerPage);
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

    const goto = useNavigate();
    function listCard() {
        return (
            <div className="row w-100">

                {
                    currentData.map(o =>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 p-1">
                            <div className="card bg-white p-0 pointer border"
                                onClick={() => goto(`/employee-detail/${o.id}`)}
                            >
                                <div className="card-body p-0 rounded">
                                    <div className="d-flex">
                                        <div className="center p-1" style={{ width: '40%' }}>
                                            <div className="center rounded" style={{ height: '150px', overflow: 'hidden' }}>
                                                <img src={`${imageUrl}${o.image}`} alt="" className='h-100 rounded' />
                                            </div>
                                        </div>
                                        <div className='f-12 ps-4 py-3' style={{ width: '60%' }}>
                                            <div className='f-16'>{o.firstName} {o.lastName}</div>
                                            <div className='text-secondary f-14'>{findBranchName(o.companyID)}.</div>

                                            <div className='text-secondary f-12'>
                                                <i class="fa-solid fa-phone px-1 ps-0"></i>{o.mobile}
                                            </div>
                                            <div className='py-2 f-12'><span className='text-badges-warning'><i class="fa-solid fa-envelope px-1 ps-0"></i>{o.email} </span></div>


                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
    function listTable() {
        return (
            <div className="card border-0 w-100">
                <div className="card-body p-0 border-0">
                    <DataGrid>
                        <table>
                            <Thead>
                                <Th columnWidth={20}>
                                    <input type="checkbox" name="" className='rounded-0 border pointer px-3' id="" />
                                </Th>
                                <Th
                                    onSort={() => handleSort("id")}
                                    sortDirection={sortConfig.key === "id" ? sortConfig.direction : ""}

                                    columnWidth={20}
                                >
                                    No
                                </Th>
                                <Th
                                    onSort={() => handleSort("firstName")}
                                    sortDirection={
                                        sortConfig.key === "firstName" ? sortConfig.direction : ""
                                    }
                                    resizable
                                    columnWidth={150}
                                >
                                    Full Name
                                </Th>
                                <Th
                                    onSort={() => handleSort("positionId")}
                                    sortDirection={
                                        sortConfig.key === "positionId" ? sortConfig.direction : ""
                                    }
                                    columnWidth={70}
                                    resizable
                                >
                                    Position
                                </Th>
                                <Th
                                    onSort={() => handleSort("mobile")}
                                    sortDirection={
                                        sortConfig.key === "mobile" ? sortConfig.direction : ""
                                    }
                                    resizable
                                    columnWidth={120}
                                >
                                    Mobile
                                </Th>

                                <Th
                                    onSort={() => handleSort("email")}
                                    sortDirection={
                                        sortConfig.key === "email" ? sortConfig.direction : ""
                                    }
                                    resizable
                                    columnWidth={100}

                                >
                                    Email
                                </Th>
                                <Th
                                    onSort={() => handleSort("workShiftID")}
                                    sortDirection={
                                        sortConfig.key === "workShiftID" ? sortConfig.direction : ""
                                    }
                                    resizable
                                    columnWidth={70}
                                >
                                    workShift
                                </Th>
                                <Th
                                    onSort={() => handleSort("address")}
                                    sortDirection={
                                        sortConfig.key === "address" ? sortConfig.direction : ""
                                    }
                                    resizable
                                    columnWidth={70}
                                >
                                    Address
                                </Th>
                                <Th
                                    onSort={() => handleSort("companyID")}
                                    sortDirection={
                                        sortConfig.key === "companyID" ? sortConfig.direction : ""
                                    }
                                    resizable
                                    columnWidth={150}

                                >
                                    Company
                                </Th>
                                <Th
                                    onSort={() => handleSort("startWorkingDate")}
                                    sortDirection={
                                        sortConfig.key === "startWorkingDate" ? sortConfig.direction : ""
                                    }
                                    resizable
                                    columnWidth={100}
                                >
                                    startWorkingDate
                                </Th>
                                <Th resizable columnWidth={80}>Action</Th>
                            </Thead>
                            <tbody>
                                {
                                    currentData.map((f, i) =>
                                        <tr className="pointer">
                                            <td>
                                                <input type="checkbox" name="" className='rounded-0 border px-3' id="" />
                                            </td>
                                            <td onClick={() => goto(`/employee-detail/${f.id}`)} className='py-3'>{f.id}</td>
                                            <td onClick={() => goto(`/employee-detail/${f.id}`)} >{f.firstName} {f.lastName}</td>
                                            <td onClick={() => goto(`/employee-detail/${f.id}`)} >Sofware Developer</td>
                                            <td onClick={() => goto(`/employee-detail/${f.id}`)} >{f.mobile}</td>
                                            <td onClick={() => goto(`/employee-detail/${f.id}`)} >{f.email}</td>
                                            <td onClick={() => goto(`/employee-detail/${f.id}`)} >{f.workShiftID}</td>
                                            <td onClick={() => goto(`/employee-detail/${f.id}`)} >{f.address}</td>
                                            <td onClick={() => goto(`/employee-detail/${f.id}`)} > <span className='text-badges-warning'>{findBranchName(f.companyID)}</span></td>
                                            <td onClick={() => goto(`/employee-detail/${f.id}`)} >{f.startWorkingDate}</td>
                                            <td>
                                                <div className="between">
                                                    <span className='text-badges-danger'>
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </span>
                                                    <span className='text-badges-green' onClick={() => goto(`/update-employee/${f.id}`)}>
                                                        <FaUserEdit />
                                                    </span>


                                                </div>
                                            </td>



                                        </tr>
                                    )
                                }
                            </tbody>

                        </table>
                    </DataGrid>

                </div>
            </div>
        )
    }
    const [itemView, setItemView] = useState();


    function setView(index) {
        if (index == 1) {
            setItemView(() => listCard())
        } else {
            setItemView(() => listTable())
        }
    }
    useEffect(() => {
        getEmployee();
        getBranch();
    }, [])
    useEffect(() => {
        setView(2);
    }, [employee])


    function menu() {
        return (
            <div className="list-header-container">
                {/* Left Section */}
                <div className="list-header-left">
                    {/* Add New Button */}
                    <button className="list-header-button add-new box-shadow" onClick={() => goto('/create-employee')}>
                        <FaPlus className="list-header-icon" />
                        Add New
                    </button>
                    <button className="list-header-button print box-shadow">
                        <FaPrint className="list-header-icon" />
                        Print
                    </button>

                    {/* Export Button */}
                    <button className="list-header-button export box-shadow" onClick={() => ExportExcel(employee, "emloyee-data")}>
                        <FaFileExport className="list-header-icon" />
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
                    {/* Print Button */}
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

                    <button className="list-header-button list box-shadow" onClick={() => setView(2)}>
                        <FaThList className="list-header-icon" />
                        List
                    </button>

                    {/* Export Button */}
                    <button className="list-header-button list box-shadow" onClick={() => setView(1)}>
                        <FaThLarge className="list-header-icon" />
                        Card
                    </button>
                    {/* Filter Button */}
                    <button className="list-header-button filter box-shadow">
                        <FaFilter className="list-header-icon" />
                        Filter
                    </button>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className='w-100'>
                <div className="container-fluid p-0 ">
                    <div className='container-fluid p-0'>
                        {menu()}
                    </div>

                </div>
                <div className="center">
                    {itemView}
                </div>

            </div>
        </>
    )
}

export default Employee
