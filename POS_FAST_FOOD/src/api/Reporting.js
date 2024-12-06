import axios from "axios";
import { hostName } from "./host";

// REST API 
// CALL DOAMIN NAME
const domain = hostName();

const URL_EXPENSE = `http://${domain}:8085/api/reporting/expense`
export const getExpenseReport = () => axios.get(URL_EXPENSE);

const URL_MONHTLY_SALE = `http://${domain}:8085/api/reporting/monthly-sale`;
export const getMonthlySaleReport = () => axios.get(URL_MONHTLY_SALE);

const URL_NET_INCOME = `http://${domain}:8085/api/reporting/net-income`;
export const getNetIncomeReport = () => axios.get(URL_NET_INCOME);

const URL_REVENUES = `http://${domain}:8085/api/reporting/revenues`;
export const getRevenuesReport = () => axios.get(URL_REVENUES);