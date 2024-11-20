import axios from "axios";
import { hostName } from "./host";
const domainName = hostName();
const URL = "http://" + domainName + ":8085/api/categories"
// const URL = 'http://localhost:8085/api/categories/getAll'
export const getAllCategory = () => axios.get(URL + '/getAll');