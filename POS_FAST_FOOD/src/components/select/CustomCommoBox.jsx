import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./customCommobox.css";

const CustomCommoBox = ({
    label,
    items,
    searchKey,
    labelKeys,
    onItemSelected,
    fontSize,
    error,
    className,
    placeholder,
    top,
    bottom,
    left,
    right,
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Generate label from multiple keys
    const generateLabel = (item) => {
        if (!labelKeys || labelKeys.length === 0) return "Unnamed Item";
        return labelKeys.map((key) => item[key]).filter(Boolean).join("  ");
    };

    // Filter items based on search term
    const filteredItems = searchKey
        ? items.filter((item) =>
            item[searchKey]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
        : items;

    return (
        <div
            className={`custom-combobox ${className}`}
            style={{
                marginTop: top || "",
                marginLeft: left || "",
                marginBottom: bottom || "",
                marginRight: right || "",
            }}
        >
            <label
                className="custom-combobox-label"
                style={{ fontSize: `${fontSize - 1}px` }}
            >
                {label}
            </label>
            {error && (
                <span
                    className="validation-error"
                    style={{ fontSize: `${fontSize - 2}px` }}
                >
                    {error}
                </span>
            )}

            <Autocomplete
                id="size-small-standard"
                options={filteredItems}
                getOptionLabel={(item) => generateLabel(item)}
                inputValue={searchTerm}
                onInputChange={(event, newInputValue) => {
                    setSearchTerm(newInputValue);
                }}
                onChange={(event, value) => {
                    if (onItemSelected) onItemSelected(value);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        style={{ fontSize: `${fontSize}px` }}
                        placeholder={placeholder || ""}
                        variant="standard"
                        InputProps={{
                            ...params.InputProps,
                            style: { fontSize: `${fontSize}px` },
                        }}
                        InputLabelProps={{
                            style: { fontSize: `${fontSize - 1}px` },
                        }}
                    />
                )}
                noOptionsText="No results found"
                classes={{ paper: "custom-combobox-dropdown" }}
            />
        </div>
    );
};

export default CustomCommoBox;
