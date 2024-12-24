import axios from "axios";
import { hostName } from "./host";
import { getToken } from "./AppConfig";

// Configure API base URL and token
const domain = hostName();
const BASE_URL_REPORTING = `http://${domain}:8085/api/reporting`;

const token = getToken();
const headers = token ? { "Authorization": `nurak ${token}` } : {};

// Reporting API functions

// Get expense report
export const getExpenseReport = () => {
    return axios.get(`${BASE_URL_REPORTING}/expense`, { headers });
};

// // Get monthly sale report
// export const getMonthlySaleReport = () => {
//     return axios.get(`${BASE_URL_REPORTING}/monthly-sale`, { headers });
// };

// Get net income report
export const getNetIncomeReport = () => {
    return axios.get(`${BASE_URL_REPORTING}/net-income`, { headers });
};

// Get revenues report
export const getRevenuesReport = () => {
    return axios.get(`${BASE_URL_REPORTING}/revenues`, { headers });
};
export const getSaleReport = () => {
    return axios.get(`${BASE_URL_REPORTING}/daily-seller-product`, { headers });
};
export const monthlySaleReporting = () => {
    return axios.get(`${BASE_URL_REPORTING}/monthly-sale`, { headers });
};
export const dailyDaleReporting = () => {
    return axios.get(`${BASE_URL_REPORTING}/daily-sale`, { headers });
};
