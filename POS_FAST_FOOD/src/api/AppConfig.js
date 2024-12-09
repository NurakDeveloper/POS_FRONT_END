import { decryptData } from "../cryptoJs/Crypto";
import Cookies from "js-cookie";
import { getEmployee } from "./EmployeeApi";
import { jwtDecode } from "jwt-decode";

const secretkey = "kans983(*93849Jnjsbd@*^@knskldn&^@($*LLjbHHSDuBKJ_)93849uIHUSHD&#%#&^$(@80928()*&*#$&(*";
export const getDefualtUserId = () => {
    try {
        const dataEncrypt = Cookies.get("user-data");
        if (dataEncrypt) {
            const userData = decryptData(dataEncrypt, secretkey);
            console.log(userData);
            if (userData.userId)
                return userData.data.id;
            else
                return 0;
        }
    } catch (e) {
        // Cookies.remove("user-data");
        window.location.reload();
        return 0;
    }
}
export const getToken = () => {
    try {
        const dataEncrypt = Cookies.get("user-data");
        if (dataEncrypt) {
            const userData = decryptData(dataEncrypt, secretkey);

            if (userData.token) {
                const decoded = jwtDecode(userData.token);
                const currentTime = Date.now() / 1000; // Current time in seconds
                if (decoded.exp && decoded.exp < currentTime) {
                    // Token expired
                    Cookies.remove("user-data");
                    window.location.href = "/"; // Redirect to login
                    return '';
                }
                return userData.token;
            } else {
                return '';
            }
        }
    } catch (e) {
        return '';
    }
};
export function userObject() {
    try {
        const dataEncrypt = Cookies.get("user-data");
        if (dataEncrypt) {
            const userData = decryptData(dataEncrypt, secretkey);
            if (userData.data) {
                const obj = {
                    "userName": userData.data.firstName + ' ' + userData.data.lastName,
                    "image": userData.data.image,
                    "role": userData.role
                }
                return obj
            } else {

                const obj = {
                    "userName": "No Username",
                    "image": '',
                    "role": userData.role
                }
                return obj
            }

        }
    } catch (e) {
        Cookies.remove("user-data");
        window.location.reload();
        return '';
    }
}


// 2 number is POS
// 1 number is admin
// 3 login again

export const checkingTypeOfUser = () => {
    try {
        const dataEncrypt = Cookies.get("user-data");
        if (dataEncrypt) {
            const userData = decryptData(dataEncrypt, secretkey);

            if (userData) {
                if (userData.role == "SELLER") {
                    return 2;
                } else if (userData.role == "ADMIN") {
                    try {
                        const admin_viewer = Cookies.get('admin_viewer');
                        if (admin_viewer) {
                            if (admin_viewer == 1) {
                                return 1;
                            } else if (admin_viewer == 2) {
                                return 2;
                            } else {
                                return 1;
                            }
                        } else {
                            return 1;
                        }

                    } catch (error) {
                        return 1;
                    }

                } else {
                    return 3;
                }

            }
        } else {
            return 3;
        }

    } catch (error) {
        return 3;
    }
}