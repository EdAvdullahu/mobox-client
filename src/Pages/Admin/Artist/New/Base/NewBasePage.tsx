import classes from "./NewBasePage.module.css";
import router from "../../../../../Router/router";
import { Outlet } from "react-router-dom";
function NewBasePage() {
 const breadCrumb = router.state.location.pathname.split("/");
 return (
  <div className={classes.main}>
   <div className={classes.breadCrumb}>
    Add new {breadCrumb[breadCrumb.length - 1]}
   </div>
   <div className={classes.content}>
    <Outlet />
   </div>
  </div>
 );
}
export default NewBasePage;
