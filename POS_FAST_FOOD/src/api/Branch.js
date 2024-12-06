import axios from "axios";
import { hostName } from "./host";
import Cookies from "js-cookie";
import { getToken } from "./AppConfig";



const domainName = hostName();
const URL = "http://" + domainName + ":8085/api/branch/"
const token = getToken();
// Set default headers for axios if a token is available
if (token) {
    axios.defaults.headers.common['Authorization'] = `nurak ${token}`;
}
export const getAllBranch = () => axios.get(URL + 'list-branch');
export const getBranchById = (id) => axios.get(URL + 'get/' + id);
export const removeBranchById = (id) => axios.delete(URL + 'remove/' + id);

export const getBranchId = () => {
    try {
        const branchId = Cookies.get("branchId");
        if (!branchId) {
            return 0; // Return a default value if the cookie doesn't exist
        }
        return JSON.parse(branchId); // Parse if it exists
    } catch (error) {
        console.error("Error parsing branchId cookie:", error);
        return 0; // Fallback to default value in case of error
    }
};
