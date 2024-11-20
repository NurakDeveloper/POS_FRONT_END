import axios from "axios";
import { hostName } from "./host";
const setHostName = hostName();
const URL = `http://${setHostName}:8085/api/user/login`
export const loginAccount = (user) => axios.post(URL, user);