import React from 'react'
import MonthlySalesReportChart from './MonthlySalesReportChart';
import { listOrder } from '../../../../api/Order';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMonthlySaleReport } from '../../../../api/Reporting';

const MonthSaleReport = () => {
    const goto = useNavigate();
    const [order, setOrder] = useState([]);
    const [monthlySalesData, setMonthlySalesData] = useState([]);
    useEffect(() => {
        getMonthlySaleReport().then((reponse) => {
            setMonthlySalesData(reponse.data);
        }).catch(e => {
            console.error(e);
        })
    }, [])
    useEffect(() => {
        listOrder().then((response) => {
            setOrder(response.data);
        })
    }, []);

    const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
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
        <div>
            <MonthlySalesReportChart data={monthlySalesData} />
            <p className="my-3 fs-4 ps-4 border-start">Order reporting</p>
            <div className="card border-0 mb-5">
                <div className="card-body p-0">
                    <table className="table-hover">
                        <thead valign='middle'>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" className='rounded-0 border pointer px-3' id="" />
                                </td>
                                <td className='py-3'>No</td>
                                <td>Invoice</td>
                                <td>OrderType</td>
                                <td>TotalAmount</td>
                                <td>Cash</td>
                                <td>Exchange</td>
                                <td>OrderTime</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                order.map((u, i) =>
                                    <tr className="pointer" onClick={() => goto(`/order-detail/${u.id}`)}>
                                        <td>
                                            <input type="checkbox" name="" className='rounded-0 px-3' id="" />
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
        </div>
    )
}

export default MonthSaleReport
