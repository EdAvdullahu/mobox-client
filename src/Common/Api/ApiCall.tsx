import axios from "axios";
import COOKIE from "../Services/cookie.service";
const token = COOKIE.getCookie("token");
export default {
 get(endpoint: any) {
  console.log("endpoint", token);
  return axios.get(endpoint, { headers: { Authorization: `bearer ${token}` } });
 },
 post(endpoint: any, params: any) {
  return axios.post(endpoint, params, {
   headers: { Authorization: `bearer ${token}` },
  });
 },
 put(endpoint: any, params: any) {
  return axios.put(endpoint, params, {
   headers: { Authorization: `bearer ${token}` },
  });
 },
 noAuth(endpoint: any, params: any | null) {
  console.log("endpoint", endpoint);
  return axios.post(endpoint, params);
 },
 getNoAuth(endpoint: any, params: any | null) {
  if (params) {
   return axios.get(endpoint, params);
  }
  return axios.get(endpoint);
 },
 postNoAuth(endpoint: any, params: any) {
  return axios.post(endpoint, params);
 },
 deleteNoAuth(endpoint: any, params: any) {
  if (params) {
   return axios.delete(endpoint, params);
  } else {
   return axios.delete(endpoint);
  }
 },
};
