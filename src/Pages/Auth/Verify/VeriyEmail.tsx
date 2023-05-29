import { useParams } from "react-router-dom";
import classes from "./VerifyEmail.module.css";
import { useEffect, useState } from "react";
import ApiCall from "../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";

function VerifyEmail() {
 const { token } = useParams<{ token: string }>();
 const [verifies, setVerified] = useState<boolean>(false);
 const [loading, setLoading] = useState<boolean>(true);
 const [dotCount, setDotCount] = useState<number>(1);

 useEffect(() => {
  const interval = setInterval(() => {
   setDotCount((prevCount) => (prevCount % 3) + 1);
  }, 500);
  if (token) {
   ApiCall.noAuth(ENDPOINTS.USER.VERIFY_EMAIL(token), null).then((res) => {
    console.log("RES DATA", res.data);
    if (res.data.isSuccess) {
     setVerified(true);
    }
    setLoading(false);
    clearInterval(interval);
   });
  }

  return () => {
   clearInterval(interval);
  };
 }, []);

 return (
  <div className={classes.main}>
   {loading
    ? "Verifying Email" + ".".repeat(dotCount)
    : verifies
    ? "Email Verified"
    : "Email Verification Failed"}
  </div>
 );
}

export default VerifyEmail;
