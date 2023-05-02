import { Outlet } from "react-router-dom";
import classes from "./LibraryBase.module.css";

function LibraryBase() {
 return (
  <div className={classes.main}>
   <Outlet />
  </div>
 );
}
export default LibraryBase;
