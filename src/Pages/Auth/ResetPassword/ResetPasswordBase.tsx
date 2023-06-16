import ApiCall from "../../../Common/Api/ApiCall";
import classes from "./ResetPassword.module.css";
import { useState } from "react";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import { toast, ToastContainer } from "react-toastify";
const ResetPasswordBase = () => {
 const [email, setEmail] = useState("");
 const logError = (message: string) => {
  toast.error(message, {
   position: "top-center",
   autoClose: 2000,
   hideProgressBar: true,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "light",
  });
 };
 const handleSubmit = async () => {
  console.log("HANDLE");
  if (email) {
   console.log("IF");
   try {
    const res = await ApiCall.post(ENDPOINTS.USER.FORGOT_PASSWORD(email), null);
    if (res.data.isSuccess) {
     toast.success("Email was sent", {
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
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     type="email"
     placeholder="Email..."
    />
   </div>
   <div className={classes.buttons}>
    <button
     disabled={email.length < 7}
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

export default ResetPasswordBase;
