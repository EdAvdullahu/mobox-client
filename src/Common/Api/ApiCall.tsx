import axios from "axios";
import COOKIE from "../Services/cookie.service";
const token = COOKIE.getCookie('token');
export default {
 get(endpoint:any) {
  console.log("endpoint", token);
  return axios.get(endpoint, { headers: { Authorization: `bearer ${token}` } });
 },
 post(endpoint:any, params:any) {
  return axios.post(endpoint, params, {
   headers: { Authorization: `bearer ${token}` },
  });
 },
 put(endpoint:any, params:any) {
  return axios.put(endpoint, params, {
   headers: { Authorization: `bearer ${token}` },
  });
 },
 noAuth(endpoint:any, params:any) {
  console.log("endpoint", endpoint);
  return axios.post(endpoint, params);
 },
};