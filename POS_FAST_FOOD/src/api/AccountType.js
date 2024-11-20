import axios from "axios";

const URL = 'http://localhost:8085/api/account-type'

export const getAllAccountType = () => axios.get(URL + '/list-account-type')