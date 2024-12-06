import React, { useEffect, useState } from "react";
import { DataGrid, Tr, Thead, Tbody, Th, Td } from "../../../../components/table/DataGrid";
import { getExpenseReport, getRevenuesReport } from "../../../../api/Reporting";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement, Filler } from "chart.js";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement, Filler);

const Revenues = () => {
    const [revenues, setRevenues] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    useEffect(() => {
        getRevenuesReport().then((response) => {
            setRevenues(response.data);
        });
    }, []);

    // Aggregate expenses by date
    const aggregatedData = revenues.reduce((acc, curr) => {
        if (!acc[curr.month]) {
            acc[curr.month] = 0;
        }
        acc[curr.month] += curr.totalRevnues;
        return acc;
    }, {});

    // Prepare data for the chart
    const labels = Object.keys(aggregatedData); // Dates
    const dataValues = Object.values(aggregatedData); // Total expenses for each date

    const data = {
        labels,
        datasets: [
            {
                label: "Daily Revenues",
                data: dataValues,
                backgroundColor: "rgba(75, 192, 192, 0.3)", // Teal
                borderColor: "rgb(29, 132, 118)",
                fill: true,
                tension: 0.4, // Smooth curve
                borderWidth: 2,
                pointBackgroundColor: "#fff",
                pointBorderColor: "rgb(29, 132, 118)",
                pointRadius: 4, // Rounded points
                pointHoverRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Total Revenues: $${context.raw.toFixed(2)}`,
                },
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: "x", // Allow panning in the x-axis
                },
                zoom: {
                    wheel: {
                        enabled: true, // Enable zooming with the mouse wheel
                    },
                    pinch: {
                        enabled: true, // Enable zooming with touch gestures
                    },
                    mode: "x", // Allow zooming in the x-axis
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Sorting logic
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sortedData = [...expense].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setRevenues(sortedData);
    };
    const rowsPerPage = 10; // Define how many rows to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index of the first and last item on the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Slice the categories array to display only the current page's rows
    const currentData = revenues.slice(startIndex, endIndex);

    // Total number of pages
    const totalPages = Math.ceil(revenues.length / rowsPerPage);
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const listTable = () => {
        return (
            <DataGrid>
                <table className="table table-striped">
                    <Thead>
                        <Th columnWidth={50}>No</Th>
                        <Th columnWidth={70} onClick={() => handleSort("month")}>Date (Month)</Th>
                        <Th columnWidth={100} onClick={() => handleSort("expenseAccount")}>Revenues Account</Th>
                        <Th columnWidth={80} onClick={() => handleSort("totalExpense")}>Total Revenues</Th>
                        <Th resizable onClick={() => handleSort("description")}>Description</Th>
                    </Thead>
                    <Tbody>
                        {currentData.map((e, i) => (
                            <Tr key={i}>
                                <Td>{i + 1}</Td>
                                <Td>{e.month}</Td>
                                <Td>{e.revenuesAccount}</Td>
                                <Td>${e.totalRevnues.toFixed(2)}</Td>
                                <Td>{e.description}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </table>
            </DataGrid>
        );
    };

    return (
        <div>
            <div style={{ width: "100%", }}>
                <p className="f-16 ps-3 border-start">
                    Revenues Chart
                </p>
                <Line data={data} options={options} />
            </div>
            <div className="py-3 d-flex justify-content-between align-items-start">
                <p className="f-16 ps-3 border-start">
                    Revenues Reporting
                </p>
                <div className="d-flex end">
                    <span className="page-info f-14 text-secondary px-1">
                        {currentPage} / {totalPages}
                    </span>
                    <div className="pagination">
                        <div className='pe-2'>
                            <button
                                className="button previous"
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                            >
                                <SlArrowLeft />
                            </button>
                        </div>

                        <button
                            className="button next"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            <SlArrowRight />
                        </button>
                    </div>
                </div>
            </div>
            {listTable()}
        </div>
    );
};

export default Revenues;
