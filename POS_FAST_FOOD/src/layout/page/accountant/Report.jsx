import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
const Report = () => {
    const goto = useNavigate();
    return (
        <>
            <div className='container-fluid px-1'>
                <div className="row w-100">
                    <div className="col-xl-10 col-md-9 col-12">
                        <Outlet />
                    </div>
                    <div className="col-xl-2 col-md-3 col-12 border px-2">
                        <div className="d-block px-2 py-3 bg-white sticky rounded f-12">


                            <Link className="nav-link text-start py-2" to='net-income'>

                                <span className=''>Net Income Report</span>
                            </Link>
                            <Link className="nav-link text-start  py-2" to='best-selling-product'>
                                <span className=''>Best Selling Menu Items by Time Period</span>
                            </Link>

                            <Link className="nav-link text-start  py-2" to='payment-method'>
                                <span className=''>Customer Service PaymentMethod</span>
                            </Link>
                            <Link className="nav-link text-start  py-2" to='monthly-sale-report'>
                                <span className=''>Monthly Sale Report</span>
                            </Link>
                            {/* <Link className="nav-link text-end py-2" to='customer-membership'>
                                <span className=''>Customer Membership</span>
                            </Link>
                            <Link className="nav-link text-end py-2" to='employee-sale-report'>
                                <span className=''>Daily Cash Register Reconciliation Report</span>
                            </Link>
                            <Link className="nav-link text-end py-2" to='employee-attendence'>
                                <span className=''>Employee Attendence</span>
                            </Link>
                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>food Menu Report</span>
                            </Link>

                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Daily Sale Report</span>
                            </Link>
                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Customer Report</span>
                            </Link>
                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Vendor Report</span>
                            </Link>
                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Employee Report</span>
                            </Link>
                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Product Low Sale</span>
                            </Link>
                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Order Reporting</span>
                            </Link>

                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Purchase Report</span>
                            </Link>

                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>POS Integrated Feedback System Reports for Customer Experience</span>
                            </Link>

                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Branch Wise Revenue Comparison Report</span>
                            </Link>

                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Discount and Promotion Effectiveness Analysis</span>
                            </Link>
                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Peak Hour Sales and Traffic Report</span>
                            </Link>

                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Net Sale By Hour</span>
                            </Link>
                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Sale Per Order Type</span>
                            </Link>
                            <Link className="nav-link text-end py-2" to='product-best-seller'>
                                <span className=''>Hour Sale Report</span>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Report
