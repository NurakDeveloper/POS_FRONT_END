import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ label, defaultColor, onColorChange }) => {
    const [color, setColor] = useState(defaultColor || "#000");

    const handleColorChange = (color) => {
        setColor(color.hex);
        if (onColorChange) {
            onColorChange(color.hex);
        }
    };

    return (
        <div style={{ margin: "10px 0" }}>
            {label && <p>{label}</p>}
            <SketchPicker color={color} onChangeComplete={handleColorChange} />
            <span style={{ marginTop: "10px", display: "block" }}>
                Selected Color: {color}
            </span>
        </div>
    );
};

export default ColorPicker;
