import axios from "axios";
import { hostName } from "./host";
import { getToken } from "./AppConfig";

// Configure API base URL and token
const domainName = hostName();
const URL_PRODUCT_API = `http://${domainName}:8085/api/seller/product`;


// API functions
export const getAllProduct = () => {
    try {
        return axios.get(`${URL_PRODUCT_API}/list-product`);
    } catch (e) {
        console.error("Error fetching all products:", e);
        return [];
    }
};

export const createProduct = (obj) => {
    return axios.post(`${URL_PRODUCT_API}/create`, obj, {
        headers: {
            "Authorization": `nurak ${token}`
        }
    });
};

export const getProductById = (id) => {
    if (token) {
        return axios.get(`${URL_PRODUCT_API}/get/${id}`, {
            headers: {
                "Authorization": `nurak ${token}`
            }
        });
    } else {
        return Promise.reject(new Error("Authorization token is missing."));
    }
};

export const updateProduct = (id, data) => {
    return axios.put(`${URL_PRODUCT_API}/update/${id}`, data, {
        headers: {
            "Authorization": `nurak ${token}`
        }
    });
};

export const removeProductById = (id) => {
    return axios.delete(`${URL_PRODUCT_API}/remove/${id}`, {
        headers: {
            "Authorization": `nurak ${token}`
        }
    });
};
