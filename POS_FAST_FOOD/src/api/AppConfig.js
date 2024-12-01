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
        return 0;
    }
}