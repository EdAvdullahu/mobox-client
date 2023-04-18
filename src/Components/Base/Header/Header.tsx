import classes from "./Header.module.css";
import { NavLink, useLocation } from "react-router-dom";
function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className={classes.header}>
      <div className={classes.header_item}>Search</div>
      <div className={classes.header_item}>
        <div className={classes.premium}>Get Premium</div>
        <div>
          <NavLink to="/music" className={classes.link}>
            Music
            {currentPath === "/music" && <div className={classes.active}></div>}
          </NavLink>
        </div>
        <div>
          <NavLink to="/podcast" className={classes.link}>
            Podcast
            {currentPath === "/podcast" && (
              <div className={classes.active}></div>
            )}
          </NavLink>
        </div>
        <div>Lang</div>
      </div>
    </div>
  );
}
export default Header;
