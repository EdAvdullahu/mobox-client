interface cookie {
  getCookie: (name: string) => string | null;
  setCookie: (name: string, param: string) => void;
  clearAllCookies: () => void;
}
const COOKIE: cookie = {
  getCookie: (name: string) => {
    return document.cookie.split("; ").reduce((accumulator:any, currentValue:any) => {
     const parts = currentValue.split("=");
     return parts[0] === name ? decodeURIComponent(parts[1]) : accumulator;
    }, null);
   },
   setCookie:(name:string, param:string) => {
    document.cookie = `${name}=${encodeURIComponent(param)}`;
   },
   clearAllCookies: () => {
    let cookies = document.cookie.split(";");
   
    for (let c = 0; c < cookies.length; c++) {
     let d = window.location.hostname.split(".");
     while (d.length > 0) {
      let cookieBase =
       encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) +
       "=' expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" +
       d.join(".") +
       " ;path=";
      let p = location.pathname.split("/");
      document.cookie = cookieBase + "/";
      while (p.length > 0) {
       document.cookie = cookieBase + p.join("/");
       p.pop();
      }
   
      d.shift();
     }
    }
   }
}
export default COOKIE;