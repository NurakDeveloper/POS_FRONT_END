import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllCustomer } from '../../../../api/Customer';
import { getAllBranch } from '../../../../api/Branch';
import * as XLSX from 'xlsx';
const Customer = () => {
    const [customer, setCustomer] = useState([]);


    function getEmployee() {
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


    const goto = useNavigate();
    function listCard() {
        return (
            <div className="row w-100">

                {
                    customer.map(o =>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <div className="card border-0 bg-white p-0 border-3 pointer mb-2 box-shadow inv-card"
                                onClick={() => goto(`/employee-detail`)}
                            >
                                <div className="card-body p-0 inv-card rounded">
                                    <div className="d-flex">
                                        <div className="center " style={{ width: '35%' }}>
                                            <div className="center rounded box-shadow" style={{ height: '170px', overflow: 'hidden' }}>
                                                <img src={`/src/assets/image/${o.image}`} alt="" className='h-100 rounded' />
                                            </div>
                                        </div>
                                        <div className='font-12 ps-4 py-3' style={{ width: '65%' }}>
                                            <div className='fs-5'>{o.firstName} {o.lastName}</div>
                                            <div className='text-secondary fs-6'>{o.city} {" , "} {o.country}</div>
                                            <div><i class="fa-solid fa-envelope px-1"></i>{" "}{o.email}</div>
                                            <div className='text-start'><i class="fa-solid fa-phone px-1"></i>{o.phoneNumber}</div>


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
                <div className="card-body p-0 border">
                    <table className="table table-striped table-hover">
                        <thead valign='middle'>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" className='rounded-0 border pointer px-3' id="" />
                                </td>
                                <td className='py-3'>No</td>
                                <td>FullName</td>
                                <td>Position</td>
                                <td>Phone</td>
                                <td>Email</td>
                                <td>City</td>
                                <td>Address</td>
                                <td>State</td>
                                <td>JoinDate</td>
                                <td>MembershipStatus</td>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                customer.map((f, i) =>
                                    <tr className="pointer" onClick={() => goto(`/item-detail`)}>
                                        <td>
                                            <input type="checkbox" name="" className='rounded-0 border px-3' id="" />
                                        </td>
                                        <td className='py-3'>{i + 1}</td>
                                        <td>{f.firstName} {f.lastName}</td>
                                        <td>{f.position}</td>
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

    }, [])
    useEffect(() => {
        setView(2);
    }, [customer])
    function menu() {
        return (
            <>
                <div className="w-100 ">
                    <div className="d-flex px-2 py-3 rounded">
                        <div className='d-flex start w-50'>
                            <Link className="btn btn-success box-shadow px-3" to='/create-employee'>
                                <span className='pe-2'><i class="fa-solid fa-circle-plus"></i></span>
                                <span className=''>New</span>
                            </Link>
                            <div class="btn-group ms-3" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-outline-secondary" ><span className='pe-2'><i class="fa-solid fa-print"></i></span>Print</button>
                                <button type="button" class="btn btn-outline-secondary" onClick={() => ExportExcel(customer, "customer_data")}><span className='pe-2'><i class="fa-solid fa-file-export"></i></span>Export</button>
                            </div>

                        </div>
                        <div className='d-flex end w-50'>
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-outline-secondary" onClick={() => setView(2)}><span className='pe-2'><i class="fa-solid fa-list"></i></span> List</button>
                                <button type="button" class="btn btn-outline-secondary" onClick={() => setView(1)}> <span className='pe-2'><i class="fa-brands fa-microsoft"></i></span>Card</button>
                            </div>
                        </div>


                    </div>
                </div>
            </>
        )
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
