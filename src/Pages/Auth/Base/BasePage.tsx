import { Outlet } from "react-router-dom";
import LogoPink from "../../../Assets/Svg/LogoPink";
import Sidebar from "../../../Components/Base/Sidebar/Sidebar";
import classes from "./LoginPage.module.css";

function BasePage() {
  return (
    <div className={classes.main}>
      <Sidebar></Sidebar>
      <div className={classes.background}></div>
      <div className={classes.container}>
        <div className={classes.logo}>
          <LogoPink></LogoPink>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
export default BasePage;
