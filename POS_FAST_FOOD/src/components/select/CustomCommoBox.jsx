import React, { useState, useEffect } from "react";
import "./customCommobox.css";

const CustomCommoBox = ({ label, items, searchKey, labelKeys, onItemSelected, fontSize, error }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState(items);
    const [isOpen, setIsOpen] = useState(false);

    // Generate label from multiple keys
    const generateLabel = (item) => {
        if (!labelKeys || labelKeys.length === 0) return "Unnamed Item";
        return labelKeys.map((key) => item[key]).filter(Boolean).join(" - ");
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchKey) {
            setFilteredItems(
                items.filter((item) =>
                    item[searchKey]?.toString().toLowerCase().includes(value.toLowerCase())
                )
            );
        } else {
            setFilteredItems(items); // Default to the full list if no key is provided
        }

        setIsOpen(true);
    };

    const handleItemClick = (item) => {
        setSearchTerm(generateLabel(item)); // Display concatenated label
        setIsOpen(false);
        if (onItemSelected) {
            onItemSelected(item); // Return the entire object
        }
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest(".custom-combobox")) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="custom-combobox">
            <label className="custom-combobox-label" style={{ fontSize: `${fontSize - 1}px` }}>{label}</label>
            <input
                style={{ fontSize: `${fontSize}px` }}
                type="text"
                className="custom-combobox-input"
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setIsOpen(true)}
                placeholder={`Search by ${searchKey || "key"}`}
            />
            {error ? <span className="validation-error"
                style={{ fontSize: `${fontSize - 2}px` }}
            >{error}</span> : ''}
            {isOpen && filteredItems.length > 0 && (
                <ul className="custom-combobox-dropdown">
                    {filteredItems.map((item) => (
                        <li
                            key={item.id || generateLabel(item)}
                            className="custom-combobox-item"
                            onClick={() => handleItemClick(item)}
                        >
                            {generateLabel(item)}
                        </li>
                    ))}
                </ul>
            )}
            {isOpen && filteredItems.length === 0 && (
                items.length > 0 ? (
                    <>
                        <ul className="custom-combobox-dropdown" style={{ fontSize: `${fontSize}px` }}>
                            {items.map((item) => (
                                <li
                                    key={item.id || generateLabel(item)}
                                    className="custom-combobox-item"
                                    onClick={() => handleItemClick(item)}
                                >
                                    {generateLabel(item)}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <>
                        <ul className="custom-combobox-dropdown">
                            <li className="custom-combobox-item">No results found</li>
                        </ul>
                    </>
                )
            )}
        </div>
    );
};

export default CustomCommoBox;
