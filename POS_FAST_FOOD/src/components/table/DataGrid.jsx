import React, { useState } from "react";
import "./DataGrid.css";

// DataGrid Wrapper
export const DataGrid = ({ children }) => {
    return <div className="data-grid">{children}</div>;
};

// Table Header Wrapper
export const Thead = ({ children }) => {
    return (
        <thead>
            <tr>{children}</tr>
        </thead>
    );
};

// Table Header Cell with Sorting and Resizing
export const Th = ({ children, onSort, sortDirection, resizable = false, columnWidth = 150 }) => {
    const [width, setWidth] = useState(columnWidth); // Default column width passed as prop
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseDown = (e) => {
        setIsResizing(true);
        const startX = e.clientX;

        const handleMouseMove = (moveEvent) => {
            const newWidth = width + (moveEvent.clientX - startX);
            setWidth(newWidth > 50 ? newWidth : 50); // Minimum width of 50px
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <th style={{ width: `${width}px` }}>
            <div className="header-cell" onClick={onSort}>
                {children}
                {sortDirection && (
                    <span className={`sort-icon ${sortDirection}`}>
                        {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                )}
            </div>
            {resizable && <div className="resizer" onMouseDown={handleMouseDown}></div>}
        </th>
    );
};

// Table Body Wrapper
export const Tbody = ({ children }) => {
    return <tbody>{children}</tbody>;
};

// Table Row
export const Tr = ({ children }) => {
    return <tr>{children}</tr>;
};

// Table Cell
export const Td = ({ children }) => {
    return <td>{children}</td>;
};
