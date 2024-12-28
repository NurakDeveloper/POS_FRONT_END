import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ColorPicker from "../../../components/color/ColorPicker";
import { Button } from "@mui/material";

const Setting = () => {
    const navigate = useNavigate();
    const [color, setColor] = useState("#123abc"); // Default color

    // Initialize color state from cookies
    useEffect(() => {
        const savedColor = Cookies.get("bg-color");
        if (savedColor) {
            setColor(savedColor); // Use the saved color if it exists
        }
    }, []);

    // Save the color to cookies and navigate back to home
    const save = () => {
        Cookies.set("bg-color", color);
        navigate("/"); // Navigate to home without a full-page reload
    };

    return (
        <>
            <div>
                <Button variant="contained" color="success" onClick={save}>
                    SAVE
                </Button>
                <div className="row">
                    <ColorPicker
                        label="Pick a Color:"
                        defaultColor={color} // Initialize with current color state
                        onColorChange={setColor} // Update state on color change
                    />
                </div>
            </div>
        </>
    );
};

export default Setting;
