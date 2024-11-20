import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
const Report = () => {
    const employees = [
        {
            id: 1,
            lastName: 'Smith',
            firstName: 'John',
            email: 'john.smith@example.com',
            phone: '123-456-7890',
            address: '123 Main St, Springfield',
            joinDate: '2021-01-15',
            updatedDate: '2023-01-15',
            position: 'Manager',
            married: true,
            joblevel: 3,
            teamLeader_id: null,
            StartWorkingDate: '2021-01-20',
            employment_status: 'Full-Time',
            salary: 60000,
            BranchID: 1,
            WorkingShift_id: 1,
            Status: 'Active',
            image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
        },
        {
            id: 2,
            lastName: 'Johnson',
            firstName: 'Emily',
            email: 'emily.johnson@example.com',
            phone: '987-654-3210',
            address: '456 Oak St, Shelbyville',
            joinDate: '2020-03-25',
            updatedDate: '2022-03-25',
            position: 'Chef',
            married: false,
            joblevel: 2,
            teamLeader_id: 1,
            StartWorkingDate: '2020-03-30',
            employment_status: 'Full-Time',
            salary: 45000,
            BranchID: 2,
            WorkingShift_id: 2,
            Status: 'Active',
            image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
        },
        {
            id: 3,
            lastName: 'Williams',
            firstName: 'Michael',
            email: 'michael.williams@example.com',
            phone: '654-987-1230',
            address: '789 Birch St, Capital City',
            joinDate: '2022-04-05',
            updatedDate: '2023-04-05',
            position: 'Waiter',
            married: false,
            joblevel: 1,
            teamLeader_id: 2,
            StartWorkingDate: '2022-04-07',
            employment_status: 'Part-Time',
            salary: 30000,
            BranchID: 1,
            WorkingShift_id: 3,
            Status: 'Active',
            image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
        },
        {
            id: 4,
            lastName: 'Brown',
            firstName: 'Sophia',
            email: 'sophia.brown@example.com',
            phone: '321-987-6540',
            address: '101 Maple St, Ogdenville',
            joinDate: '2019-05-10',
            updatedDate: '2022-05-10',
            position: 'Cashier',
            married: true,
            joblevel: 1,
            teamLeader_id: 3,
            StartWorkingDate: '2019-05-15',
            employment_status: 'Full-Time',
            salary: 35000,
            BranchID: 2,
            WorkingShift_id: 4,
            Status: 'Active',
            image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
        },
        {
            id: 5,
            lastName: 'Miller',
            firstName: 'David',
            email: 'david.miller@example.com',
            phone: '555-789-4567',
            address: '987 Elm St, Springfield',
            joinDate: '2021-09-12',
            updatedDate: '2023-09-12',
            position: 'Barista',
            married: false,
            joblevel: 1,
            teamLeader_id: 4,
            StartWorkingDate: '2021-09-15',
            employment_status: 'Part-Time',
            salary: 25000,
            BranchID: 1,
            WorkingShift_id: 5,
            Status: 'Active',
            image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
        },
        {
            id: 6,
            lastName: 'Davis',
            firstName: 'Olivia',
            email: 'olivia.davis@example.com',
            phone: '111-222-3333',
            address: '111 Pine St, Shelbyville',
            joinDate: '2018-02-20',
            updatedDate: '2023-02-20',
            position: 'Supervisor',
            married: true,
            joblevel: 2,
            teamLeader_id: 5,
            StartWorkingDate: '2018-03-01',
            employment_status: 'Full-Time',
            salary: 50000,
            BranchID: 2,
            WorkingShift_id: 6,
            Status: 'Active',
            image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
        },
        {
            id: 7,
            lastName: 'Garcia',
            firstName: 'Isabella',
            email: 'isabella.garcia@example.com',
            phone: '222-333-4444',
            address: '234 Cedar St, Capital City',
            joinDate: '2017-11-15',
            updatedDate: '2022-11-15',
            position: 'Dishwasher',
            married: false,
            joblevel: 1,
            teamLeader_id: 6,
            StartWorkingDate: '2017-12-01',
            employment_status: 'Part-Time',
            salary: 20000,
            BranchID: 1,
            WorkingShift_id: 7,
            Status: 'Active',
            image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg'
        },
        {
            id: 8,
            lastName: 'Martinez',
            firstName: 'Lucas',
            email: 'lucas.martinez@example.com',
            phone: '333-444-5555',
            address: '567 Redwood St, Ogdenville',
            joinDate: '2021-10-05',
            updatedDate: '2023-10-05',
            position: 'Waiter',
            married: false,
            joblevel: 1,
            teamLeader_id: 3,
            StartWorkingDate: '2021-10-15',
            employment_status: 'Full-Time',
            salary: 32000,
            BranchID: 2,
            WorkingShift_id: 1,
            Status: 'Active',
            image: 'https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg'
        },
        {
            id: 9,
            lastName: 'Rodriguez',
            firstName: 'Mia',
            email: 'mia.rodriguez@example.com',
            phone: '444-555-6666',
            address: '789 Walnut St, Capital City',
            joinDate: '2020-08-10',
            updatedDate: '2022-08-10',
            position: 'Host',
            married: true,
            joblevel: 2,
            teamLeader_id: 4,
            StartWorkingDate: '2020-08-15',
            employment_status: 'Full-Time',
            salary: 40000,
            BranchID: 1,
            WorkingShift_id: 2,
            Status: 'Active',
            image: 'https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg'
        },
        {
            id: 10,
            lastName: 'Wilson',
            firstName: 'Charlotte',
            email: 'charlotte.wilson@example.com',
            phone: '555-666-7777',
            address: '890 Fir St, Shelbyville',
            joinDate: '2022-12-01',
            updatedDate: '2023-12-01',
            position: 'Cashier',
            married: false,
            joblevel: 1,
            teamLeader_id: 5,
            StartWorkingDate: '2022-12-15',
            employment_status: 'Part-Time',
            salary: 30000,
            BranchID: 2,
            WorkingShift_id: 3,
            Status: 'Active',
            image: 'https://images.pexels.com/photos/432060/pexels-photo-432060.jpeg'
        },
    ];


    const goto = useNavigate();
    function listTable() {
        return (
            <div className="card border-0">
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
                                <td>WorkSift</td>
                                <td>Address</td>
                                <td>Branch</td>
                                <td>WorkDate</td>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map((f, i) =>
                                    <tr className="pointer" onClick={() => goto(`/item-detail`)}>
                                        <td>
                                            <input type="checkbox" name="" className='rounded-0 border px-3' id="" />
                                        </td>
                                        <td className='py-3'>{i + 1}</td>
                                        <td>{f.firstName} {f.lastName}</td>
                                        <td>{f.position}</td>
                                        <td>{f.phone}</td>
                                        <td>{f.email}</td>
                                        <td>{f.employment_status}</td>
                                        <td>{f.address}</td>
                                        <td>{f.BranchID}</td>
                                        <td>{f.StartWorkingDate}</td>


                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
    return (
        <>
            <div>
                <div className="row">
                    <div className="col-xl-10 col-md-9 col-12">
                        {listTable()}
                    </div>
                    <div className="col-xl-2 col-md-3 col-12">
                        <div className="d-block px-2 py-3 bg-white sticky rounded">
                            <Link className="menu-item border-bottom nav-link" to='/create-employee'>
                                {/* <span className='menu-icon'><i class="fa-solid fa-circle-plus"></i></span> */}
                                <span className='btn-menu-link'>Net Profit</span>
                            </Link>

                            <div className="menu-item border-bottom">
                                {/* <span className='menu-icon'><i class="fa-solid fa-print"></i></span> */}
                                <span className='btn-menu-link'>Expense</span>
                            </div>

                            <div className="menu-item border-bottom">
                                {/* <span className='menu-icon'><i class="fa-solid fa-file-export"></i></span> */}
                                <span className='btn-menu-link'>Sale Revenue</span>
                            </div>
                            <div className="menu-item border-bottom">
                                {/* <span className='menu-icon'><i class="fa-solid fa-list"></i></span> */}
                                <span className='btn-menu-link'>Daily Sale Report</span>
                            </div>
                            <div className="menu-item border-bottom">
                                {/* <span className='menu-icon'><i class="fa-brands fa-microsoft"></i></span> */}
                                <span className='btn-menu-link'>Income Statement</span>
                            </div>
                            <div className="menu-item border-bottom">
                                {/* <span className='menu-icon'><i class="fa-brands fa-microsoft"></i></span> */}
                                <span className='btn-menu-link'>User login</span>
                            </div>
                            <div className="menu-item border-bottom">
                                {/* <span className='menu-icon'><i class="fa-brands fa-microsoft"></i></span> */}
                                <span className='btn-menu-link'>Monthly Sales</span>
                            </div>
                            <div className="menu-item border-bottom">
                                {/* <span className='menu-icon'><i class="fa-brands fa-microsoft"></i></span> */}
                                <span className='btn-menu-link'>Membership</span>
                            </div>
                            <div className="menu-item border-bottom">
                                {/* <span className='menu-icon'><i class="fa-brands fa-microsoft"></i></span> */}
                                <span className='btn-menu-link'>Branch Total Sale</span>
                            </div>
                            <div className="menu-item border-bottom">
                                {/* <span className='menu-icon'><i class="fa-brands fa-microsoft"></i></span> */}
                                <span className='btn-menu-link'>Best Seller Item</span>
                            </div>
                            <div className="menu-item border-bottom">
                                {/* <span className='menu-icon'><i class="fa-brands fa-microsoft"></i></span> */}
                                <span className='btn-menu-link'>Employee Salary</span>
                            </div>
                            <div className="menu-item border-bottom">
                                {/* <span className='menu-icon'><i class="fa-brands fa-microsoft"></i></span> */}
                                <span className='btn-menu-link'>Time Off</span>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report
