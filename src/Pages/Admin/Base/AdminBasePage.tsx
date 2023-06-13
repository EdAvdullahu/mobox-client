import Sidebar from "../../../Components/Base/Sidebar/Sidebar";
import classes from "./AdminBasePage.module.css";
import { Outlet } from "react-router-dom";
import BaseBackground from "../../../Components/Base/BaseBackground";

function AdminBasePage() {
 return (
  <div className={classes.base}>
   <BaseBackground />
   <div className={classes.content} id="admin-portal-target">
    <Outlet />
   </div>
  </div>
 );
}
export default AdminBasePage;
