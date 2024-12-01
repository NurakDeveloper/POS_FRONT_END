import './dashboard.css'
import { Chart } from 'chart.js/auto';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import Loading from '../loading/Loading';
import ChartRevenues from './Chart/ChartRevenues';
import MostProductOrder from './Chart/MostProductOrder';
import { totalOrderToday } from '../../../api/Order';
import { countEmployee } from '../../../api/EmployeeApi';
import { getAllCustomer } from '../../../api/Customer';
import MonthSaleReport from '../report/monthlysalereport/MonthSaleReport';
import BestSellingMenuItemsChart from '../report/bestsellingproduct/BestSellingMenuItemsChart';
import NetIncomeChart from '../report/netincome/NetIncomeChart';
import { getNetIncomeReport } from '../../../api/Reporting';
import { da } from 'date-fns/locale';
import ChartComponent from '../report/netincome/ChartComponent';
const Dashboard = ({ UserName }) => {

    const [customer, setCustomer] = useState([]);
    useEffect(() => {
        getAllCustomer().then((response) => {
            setCustomer(response.data);
        })
    }, [])
    const [data, setData] = useState([]);
    const [revenues, setRevenues] = useState();
    const [expense, setExpense] = useState();
    const [income, setIncome] = useState();

    useEffect(() => {
        getNetIncomeReport().then((response) => {
            setData(response.data);
        });
    }, []);
    useEffect(() => {

        try {
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
                sum = sum + data[i].totalRevenues;
            }
            setRevenues(sum);
            sum = 0;
            for (let i = 0; i < data.length; i++) {
                sum = sum + data[i].totalExpense;
            }
            setExpense(sum);
            sum = 0;
            for (let i = 0; i < data.length; i++) {
                sum = sum + data[i].netIncome;
            }
            setIncome(sum);
            console.log('hh')

        } catch (e) {
            return 0;

        }
    }, [data])
    function findTotalRevenues() {

    }
    // function findTotalRevenues() {
    //     let sum = 0;
    //     try {
    //         for (let i = 0; i < data.length; i++) {
    //             sum = sum + data[i].findTotalRevenues;
    //         }
    //         return sum;
    //     } catch (e) {
    //         return 0;

    //     }
    // }
    // function findTotalRevenues() {
    //     let sum = 0;
    //     try {
    //         for (let i = 0; i < data.length; i++) {
    //             sum = sum + data[i].findTotalRevenues;
    //         }
    //         return sum;
    //     } catch (e) {
    //         return 0;

    //     }
    // }
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
                        <div className="col-xl-9 col-lg-6 col-md-6 col-sm-12 col-12 p-0">
                            <div className='container-fluid w-100 center animation rounded p-0'>
                                <div className="row w-100">
                                    <div className="col-xl-4 col-12  pb-2">
                                        <div className="card py-4 border-0 pointer big-shadow text-white w-100 h-100 bg-purple" style={{ height: '200px' }}>
                                            <div className="card-header border-0 fs-5 d-block bg-none border-0">
                                                <div className='d-flex h-75'>
                                                    <div className="w-100 center h-100">
                                                        <div>
                                                            <div className="fs-6 text-center">Sale Revenues</div>
                                                            <div className='fs-1'>{formatCurrency.format(revenues)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="h-25 center">
                                                    <button className="btn border-0 text-white">View Reporting <i class="fa-solid fa-arrow-right"></i></button>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-12 pb-2">
                                        <div className="card py-4 border-0 pointer big-shadow text-white  bg-purple" style={{ height: '200px' }}>
                                            <div className="card-header border-0 fs-5 d-block bg-none border-0">
                                                <div className='d-flex h-75'>
                                                    <div className="w-100 center h-100">
                                                        <div>
                                                            <div className="fs-6 text-center">Total Expense</div>
                                                            <div className='fs-1'>{formatCurrency.format(expense)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="h-25 center">
                                                    <button className="btn border-0 text-white">View Reporting <i class="fa-solid fa-arrow-right"></i></button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-12 pb-2">
                                        <div className="card py-4 border-0 pointer big-shadow text-white  bg-purple" style={{ height: '200px' }}>
                                            <div className="card-header border-0 fs-5 d-block bg-none border-0">
                                                <div className='d-flex h-75'>
                                                    <div className="w-100 center h-100">
                                                        <div>
                                                            <div className="fs-6 text-center">Net Income</div>
                                                            <div className='fs-1'>{formatCurrency.format(income)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="h-25 center">
                                                    <button className="btn border-0 text-white">View Reporting <i class="fa-solid fa-arrow-right"></i></button>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 p-0">
                            <div className="card border-0 pointer bg-none center" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                                <div className="d-flex w-100" style={{ overflow: 'hidden' }}>
                                    <div className="card-body p-0">
                                        <div className='btn-box center '>
                                            <button className="bg-white border-0 w-100 rounded start">
                                                <div className="d-flex start" >
                                                    <i class="fa-solid fa-trash border   text-primary p-3 rounded-circle"></i>
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
                                                    <i class="fa-solid fa-envelope border  text-warning p-3 rounded-circle"></i>
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
                                                    <i class="fa-solid fa-database border  text-info p-3 rounded-circle"></i>
                                                    <div className="d-block  text-start px-2">
                                                        <span className=''>Database Storage</span> <br />
                                                        <span className='f-10 text-secondary text-title  w-25'>200MB </span>
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


                <div className='container-fluid w-100 p-0 center my-2  rounded '>
                    <div className="row w-100 p-0">
                        <div className="col-xl-6 p-1">
                            <div className="card border-0 bgso  center box-shadow h-100">
                                <div className="card-body w-100 p-3 bg-white rounded "  >
                                    <h6 className='p-3 px-0'>Net Income Report</h6>
                                    <ChartComponent />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 p-1">
                            <div className="card border-0 bgso  center box-shadow h-100">
                                <div className="card-body w-100 p-3 bg-white rounded "  >
                                    <h6 className='p-3 px-0'>Best Product Sale</h6>
                                    <BestSellingMenuItemsChart />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div className='container-fluid w-100 p-0 center  bg-white '>
                    <div className="row w-100">
                        <div className="col-12 box-shadow rounded">
                            <h6 className='p-3 px-0'>Monthly Sale Report</h6>
                            {/* <div className="row">
                                <div className="col-xl-2 col-lg-3 col-md-3 col-6">
                                    <div className="card w-100" style={{ overflow: 'hidden' }}>
                                        <div className="card-img-top p-2">
                                            <img src="https://images.crunchbase.com/image/upload/c_thumb,h_256,w_256,f_auto,g_face,z_0.7,q_auto:eco,dpr_1/crvedxplgovlwey1eovk" alt="" className="img-fluid rounded-circle" />
                                        </div>
                                        <div className="card-body p-0">
                                            <div className="text-title text-center">Johny Cross</div>
                                            <div className="between px-1">
                                                <div className="f-10 text-end text-secondary hover-line pointer py-2">Vew Detail<i class="fa-solid fa-arrow-right px-2"></i></div>
                                                <div className="f-10 text-end text-secondary hover-line pointer py-2">Message<i class="fa-solid fa-envelope px-2"></i></div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-3 col-6">
                                    <div className="card w-100" style={{ overflow: 'hidden' }}>
                                        <div className="card-img-top p-2">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWpKTY2xHZszDP68onp9b9zlrov7fqTgBMguwwTpOHRFdpd4nH2d7ERIc6mSnWjfUGUjw&usqp=CAU" alt="" className="img-fluid rounded-circle" />
                                        </div>
                                        <div className="card-body p-0">
                                            <div className="text-title text-center">Tony Jaa</div>
                                            <div className="between px-1">
                                                <div className="f-10 text-end text-secondary hover-line pointer py-2">Vew Detail<i class="fa-solid fa-arrow-right px-2"></i></div>
                                                <div className="f-10 text-end text-secondary hover-line pointer py-2">Message<i class="fa-solid fa-envelope px-2"></i></div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-3 col-6">
                                    <div className="card w-100" style={{ overflow: 'hidden' }}>
                                        <div className="card-img-top p-2 ">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfNLqN8I9I4WPzNkJ1DaeLuTENBL2M0WZItJ-n1elICBhGCJsoN1gEh81QZ0HGbL548HQ&usqp=CAU" alt="" className="img-fluid rounded-circle" />
                                        </div>
                                        <div className="card-body p-0  ">
                                            <div className="text-title text-center">Deo Freddy</div>
                                            <div className="between px-1">
                                                <div className="f-10 text-end text-secondary hover-line pointer py-2">Vew Detail<i class="fa-solid fa-arrow-right px-2"></i></div>
                                                <div className="f-10 text-end text-secondary hover-line pointer py-2">Message<i class="fa-solid fa-envelope px-2"></i></div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <button className='btn btn-outline-secondary px-5 my-2'>View All</button> */}
                            <MonthSaleReport />
                        </div>

                    </div>

                </div>

            </div >




        </>
    )
}

export default Dashboard
