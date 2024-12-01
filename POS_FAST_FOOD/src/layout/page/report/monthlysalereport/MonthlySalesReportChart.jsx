import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import { ChartZoom } from 'chartjs-plugin-zoom';

// Register the necessary components for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    // ChartZoom // Register zoom functionality
);

const MonthlySalesReportChart = ({ data }) => {
    // Prepare the sales data (assuming each data point has `month` and `sales`)
    const months = data.map(item => item.month);
    const sales = data.map(item => item.sales);

    const chartData = {
        labels: months, // X-axis: months
        datasets: [
            {
                label: 'Monthly Sales',
                data: sales,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Ensure the chart adjusts to container size
        plugins: {
            title: {
                display: true,
                text: 'Monthly Sales Report',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },

        },
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales Amount (USD)',
                },
                beginAtZero: true,
            },
        },
        // Enable zoom functionality
        plugins: {
            zoom: {
                pan: {
                    enabled: true, // Enable panning
                    mode: "x", // Pan along the X-axis
                },
                zoom: {
                    wheel: {
                        enabled: true, // Enable zooming with mouse wheel
                    },
                    pinch: {
                        enabled: true, // Enable zooming with pinch gestures on touch devices
                    },
                    mode: "x", // Zoom along the X-axis
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '500px' }}> {/* Make chart container 100% width */}
            <Line data={chartData} options={options} />
        </div>
    );
};

export default MonthlySalesReportChart;
