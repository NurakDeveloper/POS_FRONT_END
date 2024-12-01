import React, { useState, useEffect } from "react";
import "./Modal.css"; // External CSS file for styling

const Modal = ({ isOpen, onClose, children, className = "" }) => {
    const [position, setPosition] = useState({ top: "50%", left: "50%" });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    // Handle mouse movement for dragging the modal
    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                top: `${e.clientY - offset.y}px`,
                left: `${e.clientX - offset.x}px`,
            });
        }
    };

    // Handle the mouse down event to start dragging
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - parseInt(position.left),
            y: e.clientY - parseInt(position.top),
        });
    };

    // Handle mouse up event to stop dragging
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Close the modal
    const closeModal = () => {
        onClose();
    };

    // Use effect to toggle visibility of the modal with smooth transitions
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            // After the closing animation, hide the modal
            setTimeout(() => setIsVisible(false), 300); // Match animation duration
        }
    }, [isOpen]);

    // Add and remove event listeners
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        } else {
            setPosition({ top: "50%", left: "50%" }); // Reset position when closed
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isOpen, isDragging]);

    return (
        isVisible && (
            <div
                className={`custom-modal-overlay ${isOpen ? "open" : ""} ${className}`}
            >
                <div
                    className="custom-modal-content"
                    style={{
                        top: position.top,
                        left: position.left,
                        transition: "top 0.2s ease, left 0.2s ease",
                    }}
                    onMouseDown={handleMouseDown}
                >
                    <div className="custom-modal-header">
                        <span className="custom-modal-close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Customizable Modal</h2>
                    </div>
                    <div className="custom-modal-body">
                        {children} {/* Render any passed content inside the modal */}
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;
