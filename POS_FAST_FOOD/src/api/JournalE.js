import axios from "axios";

const URL = "http://localhost:8085/api/journal"

export const createJournal = (j) => axios.post(URL + '/create', j);

const URL_TRANSACTION = 'http://localhost:8085/api/transaction';
export const createTransaction = (t) => axios.post(URL_TRANSACTION + '/create', t);
export const getAllJournal = () => axios.get(URL + '/list-journal');
export const getJournalByID = (id) => axios.get(URL + '/get/' + id);
export const fetchJournal = (objDate) => axios.post(URL + '/fetch-journal', objDate);