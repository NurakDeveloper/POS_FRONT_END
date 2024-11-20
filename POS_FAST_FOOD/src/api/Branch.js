import axios from "axios";
import { hostName } from "./host";
const domainName = hostName();
const URL = "http://" + domainName + ":8085/api/branch/"

export const getAllBranch = () => axios.get(URL + 'list-branch');
export const getBranchById = (id) => axios.get(URL + 'get/' + id);
export const removeBranchById = (id) => axios.delete(URL + 'remove/' + id);