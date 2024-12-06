import { decryptData } from "../cryptoJs/Crypto";
import Cookies from "js-cookie";

const secretkey = "kans983(*93849Jnjsbd@*^@knskldn&^@($*LLjbHHSDuBKJ_)93849uIHUSHD&#%#&^$(@80928()*&*#$&(*";
export const getDefualtUserId = () => {
    try {
        const dataEncrypt = Cookies.get("user-data");
        if (dataEncrypt) {
            const userData = decryptData(dataEncrypt, secretkey);
            console.log(userData);
            if (userData.userId)
                return userData.userId;
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
            if (userData.token)
                return userData.token;
            else
                return 0;
        }
    } catch (e) {
        // Cookies.remove("user-data");
        window.location.reload();
        return 0;
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
                if (userData.role == "USER") {
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