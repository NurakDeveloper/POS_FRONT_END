import React from "react";

// Icon imports (using Font Awesome for example purposes)
import { FaPlus, FaSearch, FaPrint, FaFileExport, FaFilter } from "react-icons/fa";

const ListHeader = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "10px 20px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                borderRadius: "8px",
            }}
        >
            {/* Left Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Add New Button */}
                <button
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    <FaPlus style={{ marginRight: "6px" }} />
                    Add New
                </button>

                {/* Search Input */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <FaSearch style={{ color: "#999", marginRight: "6px" }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{
                            border: "none",
                            outline: "none",
                            backgroundColor: "transparent",
                        }}
                    />
                </div>
            </div>

            {/* Right Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Print Button */}
                <button
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#2196F3",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    <FaPrint style={{ marginRight: "6px" }} />
                    Print
                </button>

                {/* Export Button */}
                <button
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#FFC107",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    <FaFileExport style={{ marginRight: "6px" }} />
                    Export
                </button>

                {/* Filter Button */}
                <button
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#FF5722",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    <FaFilter style={{ marginRight: "6px" }} />
                    Filter
                </button>
            </div>
        </div>
    );
};

export default ListHeader;
