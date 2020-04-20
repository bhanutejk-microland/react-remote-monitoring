import axios from "axios";
const keys = require("./config/keys");

const instance = axios.create({
  baseURL: keys.API_BASE_URL
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN";

instance.interceptors.request.use(request => {
  // console.log(request);
  return request;
}, error => {
  // console.log(error);
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  // console.log(response);
  return response;
}, error => {
  // console.log(error);
  return Promise.reject(error);
});

export default instance;
