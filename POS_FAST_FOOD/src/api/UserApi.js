import axios from "axios";
import { hostName } from "./host";
import { getToken } from "./AppConfig";


const domainName = hostName();
const token = getToken();
const headers = token ? { "Authorization": `nurak ${token}` } : {};
const URL = `http://${domainName}:8085/auth`

export const loginAccount = (user) => axios.post(URL + '/authentication', user);
export const createUser = (user) => axios.post(URL + '/register', user, { headers })
export const getUserByEmployeeId = (id) => axios.get(URL + '/get-user/' + id, { headers })
