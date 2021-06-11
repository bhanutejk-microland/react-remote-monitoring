import axios from "axios";
const keys = require("./config/keys");
import { authContext, adalConfig } from '../src/config/adalConfig';

const instance = axios.create({
  baseURL: keys.API_BASE_URL
});

let token = authContext.getCachedToken(adalConfig.clientId);

instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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
