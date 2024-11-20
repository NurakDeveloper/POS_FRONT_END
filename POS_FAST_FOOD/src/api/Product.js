import axios from "axios";
import { hostName } from "./host";
const domainName = hostName();
const URL_PRODUCT_API = "http://" + domainName + ":8085/api/product"
export const getAllProduct = () => axios.get(URL_PRODUCT_API + '/list-product');
export const createProduct = (obj) => axios.post(URL_PRODUCT_API + '/create', obj)
export const getProductById = (id) => axios.get('http://localhost:8085/api/product/get/' + id)
export const updateProduct = (id, data) => axios.put(URL_PRODUCT_API + '/update/' + id, data)