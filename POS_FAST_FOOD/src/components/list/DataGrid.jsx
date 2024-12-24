import React, { useState } from "react";

const DataGrid = ({ rows = [], columns = [], rowsPerPage = 5, styles = {} }) => {
    const [currentRows, setCurrentRows] = useState(rows);
    const [visibleColumns, setVisibleColumns] = useState(columns);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchFilters, setSearchFilters] = useState({});
    const [sortConfig, setSortConfig] = useState({ field: null, direction: null });

    const totalPages = Math.ceil(currentRows.length / rowsPerPage);

    // Handle Sorting
    const handleSort = (field, direction) => {
        const sortedRows = [...currentRows].sort((a, b) => {
            if (a[field] < b[field]) return direction === "asc" ? -1 : 1;
            if (a[field] > b[field]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setCurrentRows(sortedRows);
        setSortConfig({ field, direction });
    };

    // Handle Column Search
    const handleColumnSearch = (field, value) => {
        const newFilters = { ...searchFilters, [field]: value.toLowerCase() };
        setSearchFilters(newFilters);

        const filteredRows = rows.filter((row) =>
            Object.entries(newFilters).every(([key, filterValue]) =>
                String(row[key]).toLowerCase().includes(filterValue)
            )
        );

        setCurrentRows(filteredRows);
        setCurrentPage(1);
    };

    // Toggle Column Visibility
    const toggleColumnVisibility = (field) => {
        setVisibleColumns((prev) =>
            prev.map((col) =>
                col.field === field ? { ...col, visible: !col.visible } : col
            )
        );
    };

    // Paginated Rows
    const paginatedRows = currentRows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Handle Pagination
    const handlePageChange = (direction) => {
        setCurrentPage((prev) =>
            direction === "next"
                ? Math.min(prev + 1, totalPages)
                : Math.max(prev - 1, 1)
        );
    };

    return (
        <div style={{ padding: "20px", ...styles.container }}>
            {/* Table */}
            <div style={{ overflowX: "auto", marginBottom: "10px" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        border: "1px solid #ddd",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <thead>
                        <tr>
                            {visibleColumns
                                .filter((col) => col.visible)
                                .map((col) => (
                                    <th
                                        key={col.field}
                                        style={{
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                            textAlign: "left",
                                            backgroundColor: "#007bff",
                                            color: "#fff",
                                            position: "relative",
                                        }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            {col.headerName}
                                            {/* Actions Dropdown */}
                                            <div style={{ position: "relative" }}>
                                                <button
                                                    style={{
                                                        padding: "5px",
                                                        backgroundColor: "#fff",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "3px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        document
                                                            .getElementById(`dropdown-${col.field}`)
                                                            .classList.toggle("show")
                                                    }
                                                >
                                                    ⋮
                                                </button>
                                                <div
                                                    id={`dropdown-${col.field}`}
                                                    style={{
                                                        display: "none",
                                                        position: "absolute",
                                                        top: "25px",
                                                        right: "0",
                                                        backgroundColor: "#fff",
                                                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                                        borderRadius: "5px",
                                                        zIndex: 10,
                                                        padding: "10px",
                                                    }}
                                                    className="dropdown-content"
                                                >
                                                    {/* Sort ASC */}
                                                    <button
                                                        style={{
                                                            display: "block",
                                                            width: "100%",
                                                            padding: "5px 10px",
                                                            backgroundColor: "#fff",
                                                            border: "none",
                                                            textAlign: "left",
                                                            cursor: "pointer",
                                                            borderBottom: "1px solid #ddd",
                                                        }}
                                                        onClick={() => handleSort(col.field, "asc")}
                                                    >
                                                        Sort ASC
                                                    </button>
                                                    {/* Sort DESC */}
                                                    <button
                                                        style={{
                                                            display: "block",
                                                            width: "100%",
                                                            padding: "5px 10px",
                                                            backgroundColor: "#fff",
                                                            border: "none",
                                                            textAlign: "left",
                                                            cursor: "pointer",
                                                            borderBottom: "1px solid #ddd",
                                                        }}
                                                        onClick={() => handleSort(col.field, "desc")}
                                                    >
                                                        Sort DESC
                                                    </button>
                                                    {/* Search */}
                                                    <div style={{ marginTop: "10px" }}>
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            onChange={(e) =>
                                                                handleColumnSearch(col.field, e.target.value)
                                                            }
                                                            style={{
                                                                padding: "5px",
                                                                width: "100%",
                                                                borderRadius: "3px",
                                                                border: "1px solid #ddd",
                                                            }}
                                                        />
                                                    </div>
                                                    {/* Hide Column */}
                                                    <button
                                                        style={{
                                                            display: "block",
                                                            width: "100%",
                                                            padding: "5px 10px",
                                                            backgroundColor: "#fff",
                                                            border: "none",
                                                            textAlign: "left",
                                                            cursor: "pointer",
                                                            marginTop: "10px",
                                                        }}
                                                        onClick={() => toggleColumnVisibility(col.field)}
                                                    >
                                                        Hide Column
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRows.map((row) => (
                            <tr key={row.id} style={{ borderBottom: "1px solid #ddd" }}>
                                {visibleColumns
                                    .filter((col) => col.visible)
                                    .map((col) => (
                                        <td
                                            key={col.field}
                                            style={{
                                                padding: "10px",
                                                border: "1px solid #ddd",
                                                textAlign: "left",
                                            }}
                                        >
                                            {row[col.field]}
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                    style={{
                        padding: "8px",
                        backgroundColor: currentPage === 1 ? "#ddd" : "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange("next")}
                    disabled={currentPage === totalPages}
                    style={{
                        padding: "8px",
                        backgroundColor: currentPage === totalPages ? "#ddd" : "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataGrid;
