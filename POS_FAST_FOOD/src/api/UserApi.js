import axios from "axios";
import { hostName } from "./host";
const domainName = hostName();
const URL = `http://${domainName}:8085/auth/login`
export const loginAccount = (user) => axios.post(URL, user);