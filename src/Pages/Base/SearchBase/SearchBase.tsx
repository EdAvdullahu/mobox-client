import classes from "./SearchBase.module.css";
import { Outlet } from "react-router-dom";
function SearchBasePage() {
  return (
    <div className={classes.base}>
      <div className={classes.nav}></div>
      <div className={classes.content}>
        <Outlet />
      </div>
      <div className={classes.section}> NAVIGATION</div>
    </div>
  );
}
export default SearchBasePage;
