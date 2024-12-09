import React from "react";
import "./inputvalidation.css";

const InputValidation = ({ label, id, name, type, value, onChange, error, fontSize, require, placeHolder }) => {
    return (
        <div className="input-wrapper">
            <label htmlFor={id} className="input-label"
                style={{ fontSize: `${fontSize - 1}px` }}
            >
                <span>{label}</span>
                <span className="text-danger ps-3">{require ? '*' : ''}</span>
            </label>
            <input
                type={type}
                id={id}
                style={{ fontSize: `${fontSize}px` }}
                className={`input-box ${error ? "border-danger" : ""}`}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeHolder}
            />
            {error ? <span className="validation-error"
                style={{ fontSize: `${fontSize - 2}px` }}
            >{error}</span> : ''}
        </div>
    );
};

export default InputValidation;
