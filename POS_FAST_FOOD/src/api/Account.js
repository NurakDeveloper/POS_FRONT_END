import axios from "axios";

const URL_API = 'http://localhost:8085/api/account';

export const createAccount = (account) => axios.post(URL_API + '/create', account);
export const getAllAccount = () => axios.get(URL_API + '/' + "list-account");