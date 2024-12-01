import axios from "axios";
import { hostName } from "./host";
const setHostName = hostName();
const URL = `http://${setHostName}:8085/api/employee`
export const getAllEmployee = () => axios.get(URL + '/list-employee');
export const newEmployee = (employee) => axios.post(`http://${setHostName}:8085/api/employee/create`, employee);
export const countEmployee = () => axios.get(`http://${setHostName}:8085/api/employee/count`);
export const getEmployee = (id) => axios.get(URL + '/get/' + id);
export const updateEmployee = (id, employee) => axios.put(URL + '/update-employee/' + id, employee);