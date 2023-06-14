import { Outlet, useLocation } from "react-router-dom";
import classes from "./StatisticsBase.module.css";
const StatisticsBase = () => {
 const path = useLocation().pathname.split("/");
 return (
  <div className={classes.main}>
   <div className={classes.title}> {path[path.length - 1] + " Statistics"}</div>
   <div className={classes.content}>
    <Outlet />
   </div>
  </div>
 );
};
export default StatisticsBase;
