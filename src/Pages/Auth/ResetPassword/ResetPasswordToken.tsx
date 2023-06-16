import { useParams } from "react-router-dom";
import ApiCall from "../../../Common/Api/ApiCall";
import classes from "./ResetPassword.module.css";
import { useState, useEffect } from "react";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import { toast, ToastContainer } from "react-toastify";

const ResetPasswordToken = () => {
 const passR = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}");
 const [password, setPassword] = useState<string>("");
 const [cPassword, setCP] = useState<string>("");
 const [disabled, setDisabled] = useState(true);
 useEffect(() => {
  setDisabled(!passR.test(password) && password === cPassword);
 }, [password, cPassword]);
 const { token } = useParams<{ token: string }>();
 const logError = (message: string) => {
  toast.error(message, {
   position: "top-center",
   autoClose: 2000,
   hideProgressBar: true,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "dark",
  });
 };
 const handleSubmit = async () => {
  console.log("HANDLE");
  if (password) {
   console.log("IF");
   try {
    const res = await ApiCall.post(ENDPOINTS.USER.RESET_PASSWORD(), {
     token: token,
     password: password,
     confirmPassword: cPassword,
    });
    if (res.data.isSuccess) {
     toast.success(res.data.result, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
     });
    } else {
     logError(res.data.displayMessage);
    }
   } catch (error) {
    logError("Something went wrong");
   }
  }
 };
 return (
  <div className={classes.main}>
   <ToastContainer />
   <div className={classes.title}>Reset Password</div>
   <div className={classes.field}>
    <input
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     type="password"
     placeholder="Password..."
    />
    <input
     value={cPassword}
     onChange={(e) => setCP(e.target.value)}
     type="password"
     placeholder="Confirm password..."
    />
   </div>
   <div className={classes.buttons}>
    <button
     disabled={disabled}
     type="submit"
     onClick={handleSubmit}
     className={classes.login}
    >
     Submit
    </button>
   </div>
  </div>
 );
};
export default ResetPasswordToken;
