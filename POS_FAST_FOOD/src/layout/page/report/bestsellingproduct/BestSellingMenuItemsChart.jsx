import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-plugin-zoom'; // Ensure this plugin is installed
import { getAllProductSoldReport } from '../../../../api/Procedure';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Function to generate random rgba color
const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b},0.6)`; // Random color with 60% opacity
};

const BestSellingMenuItemsChart = () => {
    const [data, setRowData] = useState([]);

    useEffect(() => {
        // Fetch data from your API
        getAllProductSoldReport().then((response) => {
            setRowData(response.data);
        }).catch(error => {
            console.error('Error fetching data: ', error);
        });
    }, []);

    // Aggregate the sales by month and product
    const aggregatedData = {};

    data.forEach(item => {
        const { orderDate, product, sold } = item;
        if (!aggregatedData[orderDate]) {
            aggregatedData[orderDate] = {};
        }
        if (!aggregatedData[orderDate][product]) {
            aggregatedData[orderDate][product] = 0;
        }
        aggregatedData[orderDate][product] += sold;
    });

    // Prepare the data for the chart
    const months = Object.keys(aggregatedData);
    const products = Array.from(new Set(data.map(item => item.product)));

    const chartData = {
        labels: months,
        datasets: products.map((product) => ({
            label: product,
            data: months.map(month => aggregatedData[month][product] || 0),
            backgroundColor: generateRandomColor(), // Assign random color
            borderColor: 'rgba(75,192,192,1)', // Border color for bars
            borderWidth: 1,
        })),
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Best Selling Products by Month (Bar Chart)',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.raw + ' units sold';
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
        zoom: {
            pan: {
                enabled: true,
                mode: 'xy',
            },
            zoom: {
                enabled: true,
                mode: 'xy',
                speed: 0.1,
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {/* <h2>Best Selling Products by Month</h2> */}
            {data.length === 0 ? (
                <p>Loading data...</p>
            ) : (
                <div style={{ width: '100%', height: '100%' }}>
                    <Bar data={chartData} options={options} style={{ height: '100%', width: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default BestSellingMenuItemsChart;
