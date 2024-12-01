import React, { useState } from "react";
import "./ComboBox.css";

const ComboBox = ({
  options,
  onSelect,
  labelKeys = ["label"], // Array of keys for labels
  className = "",
  inputClassName = "",
  optionsClassName = "",
  optionClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    if (onSelect) onSelect(option); // Pass the selected object back to the parent.
  };

  const formatLabel = (option) =>
    labelKeys.map((key) => option[key]).join(" - "); // Combine keys with a separator.

  return (
    <div className={`combo-box ${className}`}>
      <div
        className={`combo-box-input ${inputClassName}`}
        onClick={toggleDropdown}
        role="button"
        tabIndex="0"
      >
        {selectedValue ? formatLabel(selectedValue) : "Select an option"}
        <button className={`arrow ${isOpen ? "rotate" : ""}`}>{isOpen ? "▲" : "▼"}</button>
      </div>
      {isOpen && (
        <ul className={`animation combo-box-options ${optionsClassName}`}>
          {options.map((option) => (
            <li
              key={option.id}
              className={`combo-box-option ${optionClassName}`}
              onClick={() => handleSelect(option)}
            >
              {formatLabel(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;