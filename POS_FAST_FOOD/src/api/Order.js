import axios from "axios";
import { hostName } from "./host";

const host = hostName();
const URL = `http://${host}:8085/api/order`

export const createOrder = (order) => axios.post(URL + '/post-multiple-items', order)

const URL_ORDER_LINE = `http://${host}:8085/api/order-line`;
export const createOrderLine = (orderLine) => axios.post(URL_ORDER_LINE + '/create', orderLine);
export const listOrderLineByOrderID = (id) => axios.get(URL_ORDER_LINE + '/get-by-order/' + id);

export const listOrder = () => axios.get(URL + '/list-order')
export const getOrderByID = (id) => axios.get(URL + '/get/' + id);
export const totalOrderToday = () => axios.get(`http://${host}:8085/api/order/total-order`);