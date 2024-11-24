import axios from "axios";
import { hostName } from "./host";
const host = hostName();
const URL_API = `http://${host}:8085/api/account`

export const createAccount = (account) => axios.post(URL_API + '/create', account);
export const getAllAccount = () => axios.get(URL_API + '/' + "list-account");