import axios from "axios";
import COOKIE from "../Services/cookie.service";

export default {
 get(endpoint: any) {
  const token = COOKIE.getCookie("userToken");
  console.log("endpoint", token);
  return axios.get(endpoint, { headers: { Authorization: `bearer ${token}` } });
 },
 login(endpoint: any, UserToken: string) {
  return axios.get(endpoint, {
   headers: { Authorization: `bearer ${UserToken}` },
  });
 },
 post(endpoint: any, params: any) {
  const token = COOKIE.getCookie("userToken");
  return axios.post(endpoint, params, {
   headers: { Authorization: `bearer ${token}` },
  });
 },
 put(endpoint: any, params: any) {
  const token = COOKIE.getCookie("userToken");
  return axios.put(endpoint, params, {
   headers: { Authorization: `bearer ${token}` },
  });
 },
 noAuth(endpoint: any, params: any | null) {
  console.log("endpoint", endpoint);
  return axios.post(endpoint, params);
 },
 getObj(endpoint: any, params: any | null) {
  const token = COOKIE.getCookie("userToken");
  if (params) {
   return axios.get(endpoint, {
    params,
    headers: { Authorization: `bearer ${token}` },
   });
  }
  return axios.get(endpoint);
 },
 delete(endpoint: any, params: any) {
  const token = COOKIE.getCookie("userToken");
  if (params) {
   return axios.delete(endpoint, {
    params,
    headers: { Authorization: `bearer ${token}` },
   });
  } else {
   return axios.delete(endpoint, {
    headers: { Authorization: `bearer ${token}` },
   });
  }
 },
 putNoAuth(endpoint: any, params: any) {
  if (params) {
   return axios.put(endpoint, params);
  } else {
   return axios.put(endpoint);
  }
 },
};
