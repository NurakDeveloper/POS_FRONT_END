import './dashboard.css'
import { Chart } from 'chart.js/auto';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import Loading from '../loading/Loading';
import ChartRevenues from './Chart/ChartRevenues';
import MostProductOrder from './Chart/MostProductOrder';
import { totalOrderToday } from '../../../api/Order';
import { countEmployee } from '../../../api/EmployeeApi';
const Dashboard = ({ UserName }) => {



    const [totalOrder, setTotalOrder] = useState();

    const [employeeCount, setCountEmployee] = useState();
    useEffect(() => {
        totalOrderToday().then((response) => {
            setTotalOrder(response.data);
        })
        countEmployee().then((reponse) => {
            setCountEmployee(reponse.data);
        })
    }, [])
    const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    const [loading, setLoading] = useState(true);
    const [dayOfWeek, setDayOfWeek] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const dayNumber = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
        setDayOfWeek(dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`);
    }, []);
    useEffect(() => {
        // Simulate data fetching or other asynchronous actions
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after the data is "loaded"
        }, 300); // Adjust time as needed

        return () => clearTimeout(timer); // Clean up timeout on unmount
    }, []);
    const newChartRef = useRef(null);

    useEffect(() => {
        // Check if the canvas ref is attached to a DOM element
        const chartContext = newChartRef.current?.getContext('2d');
        if (!chartContext) return;  // Exit if the canvas isn't available

        // Create the chart instance
        const myChart = new Chart(chartContext, {
            type: 'bar',
            data: {
                labels: [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ],
                datasets: [{
                    label: 'Total Orders',
                    data: [1090, 900, 2050, 12003, 1300, 4000, 1090, 900, 2050, 12003, 1300, 4000],
                    backgroundColor: '#38A6CB',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        boxPadding: 3
                    }
                }
            }
        });

        // Cleanup function to destroy chart on component unmount
        return () => {
            myChart.destroy();
        };
    }, [loading]);
    const currentDate = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <>
            <div className="my-3 p-2 ">

                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-xl-9 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className='container-fluid w-100 p-2 pt-3 center animation bg-purple rounded'>
                                <div className="row w-100">
                                    <div className="col-xl-4 col-12  pb-2">
                                        <div className="card py-4 border-0 pointer big-shadow text-white w-100 h-100 bgO" style={{ height: '200px' }}>
                                            <div className="card-header border-0 fs-5 d-block bg-none border-0">
                                                <div className='d-flex'>
                                                    <div className="w-100 center">
                                                        <div>
                                                            <div className="fs-6 text-center">Sale Revenues</div>
                                                            <div className='fs-1'>$20,000.00</div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="w-25 end">
                                            <div className="fs-6 center border rounded-circle text-white box-shadow" style={{ width: 60, height: 60 }}>
                                                <i class="fa-solid fa-gauge"></i>
                                            </div>
                                        </div> */}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-12 pb-2">
                                        <div className="card py-4 border-0 pointer big-shadow text-white bgO" style={{ height: '200px' }}>
                                            <div className="card-header border-0 fs-5 d-block bg-none border-0">
                                                <div className='d-flex'>
                                                    <div className="w-100 center">
                                                        <div>
                                                            <div className="fs-6 text-center">Total Expense</div>
                                                            <div className='fs-1'>$3,070.00</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-12 pb-2">
                                        <div className="card py-4 border-0 pointer big-shadow text-white bgO" style={{ height: '200px' }}>
                                            <div className="card-header border-0 fs-5 d-block bg-none border-0">
                                                <div className='d-flex'>
                                                    <div className="w-100 center">
                                                        <div>
                                                            <div className="fs-6 text-center">Sale Totday</div>
                                                            <div className='fs-1'>{formatCurrency.format(totalOrder)}</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 center ">
                            <div className="card border-0 pointer bg-none p-0" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                                <div className="h-100 d-flex" style={{ overflow: 'hidden' }}>
                                    <div className="card-body p-0">
                                        <div className='btn-box center '>
                                            <button className="bg-white border-0 w-100 rounded start">
                                                <div className="d-flex start" >
                                                    <i class="fa-solid fa-trash border  p-3 rounded-circle"></i>
                                                    <div className="d-block text-title text-start px-2">
                                                        <span className=''>Trash</span> <br />
                                                        <span className='f-10 text-secondary'>new item 324 trash your file problem</span>
                                                    </div>

                                                </div>

                                            </button>
                                        </div>
                                        <div className='btn-box center '>
                                            <button className="bg-white border-0 w-100 rounded start">
                                                <div className="start" >
                                                    <i class="fa-solid fa-envelope border p-3 rounded-circle"></i>
                                                    <div className="d-block  text-start px-2">
                                                        <span className=''>Message</span> <br />
                                                        <span className='f-10 text-secondary text-title w-25'>New massage from saka da , raek smey , punlue</span>
                                                    </div>
                                                </div>
                                                {/* <div className="w-100 end ps-2" >
                                                    <i class="fa-solid fa-envelope"></i>
                                                </div> */}
                                            </button>
                                        </div>
                                        <div className='btn-box center '>
                                            <button className="bg-white border-0 w-100 rounded start">
                                                <div className="start" >
                                                    <i class="fa-solid fa-database border p-3 rounded-circle"></i>
                                                    <div className="d-block  text-start px-2">
                                                        <span className=''>Database Storage</span> <br />
                                                        <span className='f-10 text-secondary text-title w-25'>200MB </span>
                                                    </div>
                                                </div>

                                            </button>
                                        </div>




                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div className='container-fluid w-100 p-0 center my-3 animation-2 bg-white rounded box-shadow'>
                    <div className="row w-100 p-0">
                        <div className="col-xl-9 col-sm-12">
                            <div className="card border-0 bgso  center" style={{ height: '540px' }}>
                                <div className="card-body w-100 p-3 bg-white rounded "  >
                                    <ChartRevenues />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-12">
                            <div className="card border-0 bgso  center rounded" style={{ height: '540px' }}>
                                <div className="card-body w-100 bg-white p-1 rounded"  >
                                    <MostProductOrder />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='container-fluid w-100 p-0 center animation-3'>
                    <div className="row w-100">
                        <div className="col-xl-9 col-md-8 col-12">

                        </div>
                        <div className="col-xl-3 col-md-4 pb-2">
                            <div className="card py-4 border pointer text-dark" style={{ height: '250px' }}>
                                <div className="card-header border-0 fs-5 d-block bg-none border-0">
                                    <div className='d-flex'>
                                        <div className="w-100 start">
                                            <div>
                                                <div className="fs-6 text-secondary">Number of Employee All Branch</div>
                                                <div className='fs-1'>{employeeCount}</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>




                    </div>
                </div>

            </div>




        </>
    )
}

export default Dashboard
