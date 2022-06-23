import axios from "axios";
import authHeader from "./helpers/authHeader";

const {headers} = authHeader();
console.log(headers)
const http = axios.create({
    baseURL: 'http://localhost:3030/api/',
    headers
  });

export default http;