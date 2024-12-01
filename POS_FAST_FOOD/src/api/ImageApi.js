import axios from "axios";

export const uploadImage = async (formData) => {
    try {
        const response = await axios.post("http://localhost:8085/api/images/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // Return success response
    } catch (error) {
        // Handle and return error
        throw error.response?.data || "Error uploading file";
    }
};
