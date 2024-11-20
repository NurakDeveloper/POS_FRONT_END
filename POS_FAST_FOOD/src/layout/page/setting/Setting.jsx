import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
const Setting = () => {

    const goto = useNavigate();

    function listCard() {
        return (
            <>
                <div className="w-100 row">
                    <div className="col-xl-4 col-sm-12">
                        <div className="card border-0 bg-white p-0 border-3 pointer mb-2 box-shadow inv-card"
                            onClick={() => goto(`/position`)}
                            style={{ height: '140px' }}
                        >
                            <div className="card-body p-0 inv-card rounded">
                                <div className="d-flex">
                                    <div className="w-25 center ">
                                        <div className="center rounded " style={{ height: '140px', overflow: 'hidden' }}>
                                            <i class="fa-regular fa-chart-bar fs-1"></i>
                                        </div>
                                    </div>
                                    <div className='font-12 w-75 py-3'>
                                        <div className='fs-5'>Position</div>
                                        <div className='fs-6'>Last Insert 2024-10-10</div>
                                        <div className='font-12 text-start text-secondary'>
                                            Can Create ,Update , Remove
                                        </div>
                                        <div className='text-start fw-bold'>16</div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-12">
                        <div className="card border-0 bg-white p-0 border-3 pointer mb-2 box-shadow inv-card"
                            onClick={() => goto(`/work-space`)}
                            style={{ height: '140px' }}
                        >
                            <div className="card-body p-0 inv-card rounded">
                                <div className="d-flex">
                                    <div className="w-25 center ">
                                        <div className="center rounded " style={{ height: '140px', overflow: 'hidden' }}>
                                            <i class="fa-solid fa-laptop fs-1"></i>
                                        </div>
                                    </div>
                                    <div className='font-12 w-75 py-3'>
                                        <div className='fs-5'>Work space</div>
                                        <div className='fs-6'>Last Insert 2024-10-10</div>
                                        <div className='font-12 text-start text-secondary'>
                                            Manage All Category Create ,Update , Remove
                                        </div>
                                        <div className='text-start fw-bold'>3</div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-12">
                        <div className="card border-0 bg-white p-0 border-3 pointer mb-2 box-shadow inv-card"
                            onClick={() => goto(`/list-purchase`)}
                            style={{ height: '140px' }}
                        >
                            <div className="card-body p-0 inv-card rounded">
                                <div className="d-flex">
                                    <div className="w-25 center ">
                                        <div className="center rounded " style={{ height: '140px', overflow: 'hidden' }}>
                                            <i class="fa-solid fa-trash fs-1"></i>
                                        </div>
                                    </div>
                                    <div className='font-12 w-75 py-3'>
                                        <div className='fs-5'>Trush</div>
                                        <div className='fs-6'>Last Insert 2024-12-10</div>
                                        <div className='font-12 text-start text-secondary'>
                                            Manage All Item View,Create ,Update , Remove
                                        </div>
                                        <div className='text-start fw-bold'>1200</div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-12 pt-2">
                        <div className="card border-0 bg-white p-0 border-3 pointer mb-2 box-shadow inv-card"
                            onClick={() => goto(`/work-shift`)}
                            style={{ height: '140px' }}
                        >
                            <div className="card-body p-0 inv-card rounded">
                                <div className="d-flex">
                                    <div className="w-25 center ">
                                        <div className="center rounded " style={{ height: '140px', overflow: 'hidden' }}>
                                            <i class="fa-solid fa-school-circle-check fs-1"></i>
                                        </div>
                                    </div>
                                    <div className='font-12 w-75 py-3'>
                                        <div className='fs-5'>Work Shift</div>
                                        <div className='fs-6'>Last Insert 2024-12-10</div>
                                        <div className='font-12 text-start text-secondary'>
                                            Manage All Item View,Create ,Update , Remove
                                        </div>
                                        <div className='text-start fw-bold'>1200</div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-sm-12 pt-2">
                        <div className="card border-0 bg-white p-0 border-3 pointer mb-2 box-shadow inv-card"
                            onClick={() => goto(`/promotion`)}
                            style={{ height: '140px' }}
                        >
                            <div className="card-body p-0 inv-card rounded">
                                <div className="d-flex">
                                    <div className="w-25 center ">
                                        <div className="center rounded " style={{ height: '140px', overflow: 'hidden' }}>
                                            <i class="fa-solid fa-file-invoice-dollar fs-1"></i>
                                        </div>
                                    </div>
                                    <div className='font-12 w-75 py-3'>
                                        <div className='fs-5'>Promotion</div>
                                        <div className='fs-6'>Last Insert 2024-12-10</div>
                                        <div className='font-12 text-start text-secondary'>
                                            Manage All Item View,Create ,Update , Remove
                                        </div>
                                        <div className='text-start fw-bold'>1200</div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-12 pt-2">
                        <div className="card border-0 bg-white p-0 border-3 pointer mb-2 box-shadow inv-card"
                            onClick={() => goto(`/order-type`)}
                            style={{ height: '140px' }}
                        >
                            <div className="card-body p-0 inv-card rounded">
                                <div className="d-flex">
                                    <div className="w-25 center ">
                                        <div className="center rounded " style={{ height: '140px', overflow: 'hidden' }}>
                                            <i class="fa-solid fa-book fs-1"></i>
                                        </div>
                                    </div>
                                    <div className='font-12 w-75 py-3'>
                                        <div className='fs-5'>Order Type</div>
                                        <div className='fs-6'>Last Insert 2024-12-10</div>
                                        <div className='font-12 text-start text-secondary'>
                                            Manage All Item View,Create ,Update , Remove
                                        </div>
                                        <div className='text-start fw-bold'>1200</div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-12 pt-2">
                        <div className="card border-0 bg-white p-0 border-3 pointer mb-2 box-shadow inv-card"
                            onClick={() => goto(`/payment-method`)}
                            style={{ height: '140px' }}
                        >
                            <div className="card-body p-0 inv-card rounded">
                                <div className="d-flex">
                                    <div className="w-25 center ">
                                        <div className="center rounded " style={{ height: '140px', overflow: 'hidden' }}>
                                            <i class="fa-solid fa-money-check-dollar fs-1"></i>
                                        </div>
                                    </div>
                                    <div className='font-12 w-75 py-3'>
                                        <div className='fs-5'>Payment Method</div>
                                        <div className='fs-6'>Last Insert 2024-12-10</div>
                                        <div className='font-12 text-start text-secondary'>
                                            Manage All Item View,Create ,Update , Remove
                                        </div>
                                        <div className='text-start fw-bold'>1200</div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div>
                <div className="row">
                    <div className="col-12">
                        {listCard()}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Setting
