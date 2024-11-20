import axios from "axios";
import { hostName } from "./host";

const domainName = hostName();
const URL = "http://" + domainName + ":8085/api/customer/"

export const getAllCustomer = () => axios.get(URL + 'list-customer');
export const getCustomerById = (id) => axios.get(URL + 'get/' + id);
export const removeCustomerById = (id) => axios.delete(URL + 'remove/' + id);
export const upadateCustomer = (customer, id) => axios.put(URL + 'update/' + id, customer);
