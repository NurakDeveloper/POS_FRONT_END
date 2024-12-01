import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllCustomer } from '../../../../api/Customer';
import * as XLSX from 'xlsx';
import { el } from 'date-fns/locale';
import { DataGrid, Tbody, Td, Th, Thead, Tr } from '../../../../components/table/DataGrid'
import { FaPlus, FaSearch, FaPrint, FaFileExport, FaFilter, FaThList, FaThLarge } from "react-icons/fa";

const Customer = () => {

    const [customer, setCustomer] = useState([]);


    function getCustomer() {
        getAllCustomer().then((response) => {
            setCustomer(response.data);
            console.log(response.data);

        }).catch(error => {
            console.error(error);
        })
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

        const sortedData = [...customer].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setCustomer(sortedData);
    };
    useEffect(() => {
        getCustomer();
    }, [])


    const goto = useNavigate();
    function listCard() {
        return (
            <div className="row w-100">

                {/* {
                    customer.map(o =>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <div className="card bg-white p-0 pointer mb-2 border"
                                onClick={() => goto(`/employee-detail/${o.id}`)}
                            >
                                <div className="card-body p-0 inv-card rounded">
                                    <div className="d-flex">
                                        <div className="center p-1" style={{ width: '40%' }}>
                                            <div className="center rounded" style={{ height: '200px', overflow: 'hidden' }}>
                                                <img src={`/src/assets/image/${o.image}`} alt="" className='h-100 rounded' />
                                            </div>
                                        </div>
                                        <div className='f-12 ps-4 py-3' style={{ width: '60%' }}>
                                            <div className='f-16'>{o.firstName} {o.lastName}</div>
                                            <div className='text-secondary f-14'>{findBranchName(o.companyID)}.</div>
                                            <div><i class="fa-solid fa-envelope px-1 ps-0"></i>{o.email}</div>
                                            <div className='text-start'><i class="fa-solid fa-phone px-1 ps-0"></i>{o.mobile}</div>


                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } */}
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
                                <Th resizable columnWidth={50}>
                                    <input type="checkbox" name="" className='rounded-0 border pointer px-3' id="" />
                                </Th>
                                <Th
                                    onSort={() => handleSort("id")}
                                    sortDirection={sortConfig.key === "id" ? sortConfig.direction : ""}
                                    resizable
                                    columnWidth={50}
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
                                    onSort={() => handleSort("phoneNumber")}
                                    sortDirection={
                                        sortConfig.key === "phoneNumber" ? sortConfig.direction : ""
                                    }
                                    resizable
                                    columnWidth={120}
                                >
                                    phoneNumber
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
                                    onSort={() => handleSort("city")}
                                    sortDirection={
                                        sortConfig.key === "city" ? sortConfig.direction : ""
                                    }
                                    resizable
                                    columnWidth={70}
                                >
                                    City
                                </Th>
                                <Th
                                    onSort={() => handleSort("city")}
                                    sortDirection={
                                        sortConfig.key === "city" ? sortConfig.direction : ""
                                    }
                                    resizable
                                    columnWidth={70}
                                >
                                    Address
                                </Th>
                                <Th
                                    onSort={() => handleSort("state")}
                                    sortDirection={
                                        sortConfig.key === "state" ? sortConfig.direction : ""
                                    }
                                    resizable
                                    columnWidth={100}

                                >
                                    State
                                </Th>
                                <Th
                                    onSort={() => handleSort("membershipStatus")}
                                    sortDirection={
                                        sortConfig.key === "membershipStatus" ? sortConfig.direction : ""
                                    }
                                    resizable
                                    columnWidth={100}
                                >
                                    JoinDate
                                </Th>
                                <Th resizable columnWidth={50}>Membership</Th>
                            </Thead>
                            <tbody>
                                {
                                    customer.map((f, i) =>
                                        <tr className="pointer" onClick={() => goto(`/item-detail`)}>
                                            <td>
                                                <input type="checkbox" name="" className='rounded-0 border px-3' id="" />
                                            </td>
                                            <td className='py-3'>{f.id}</td>
                                            <td>{f.firstName} {f.lastName}</td>
                                            <td>{f.phoneNumber}</td>
                                            <td>{f.email}</td>
                                            <td>{f.city}</td>
                                            <td>{f.city}{"'s "}{f.country}</td>
                                            <td>{f.state}</td>
                                            <td>{f.joinDate}</td>
                                            <td>{f.membershipStatus}</td>


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
        setView(2);
    }, [customer])


    function menu() {
        return (
            <div className="list-header-container">
                {/* Left Section */}
                <div className="list-header-left">
                    {/* Add New Button */}
                    <button className="list-header-button add-new box-shadow" onClick={() => goto('/create-customer')}>
                        <FaPlus className="list-header-icon" />
                        Add New
                    </button>
                    <button className="list-header-button print box-shadow">
                        <FaPrint className="list-header-icon" />
                        Print
                    </button>

                    {/* Export Button */}
                    <button className="list-header-button export box-shadow" onClick={() => ExportExcel(customer, "customer-data")}>
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
                    <div className='container-fluid'>
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

export default Customer
