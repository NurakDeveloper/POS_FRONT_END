import axios from "axios";
import { hostName } from "./host";

const host = hostName();
const URL = `http://${host}:8085/api/journal`

export const createJournal = (j) => axios.post(URL + '/create', j);

const URL_TRANSACTION = `http://${host}:8085/api/transaction`;
export const createTransaction = (t) => axios.post(URL_TRANSACTION + '/create', t);
export const getAllJournal = () => axios.get(URL + '/list-journal');
export const getJournalByID = (id) => axios.get(URL + '/get/' + id);
export const fetchJournal = (objDate) => axios.post(URL + '/fetch-journal', objDate);