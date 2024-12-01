import axios from "axios";
import { hostName } from "./host";


const domainName = hostName();
const URL_PROCEDURE_GET_PRODUCT_SOLD = `http://${domainName}:8085/api/product/list-product-sold`
export const getAllProductSoldReport = () => axios.get(URL_PROCEDURE_GET_PRODUCT_SOLD);