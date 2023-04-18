import Player from "../../../Components/Base/Player/Player";
import Sidebar from "../../../Components/Base/Sidebar/Sidebar";
import Card from "../../../Components/Card/Card";
import classes from "./SongBasePage.module.css";
import { Outlet } from "react-router-dom";
function SongBasePage() {
  return (
    <div className={classes.base}>
      <div className={classes.nav}>
        <Sidebar></Sidebar>
      </div>
      <div className={classes.content}>
        <Outlet />
      </div>
      <div className={classes.section}> NAVIGATION</div>
      <Player
        title="Temporary"
        artist="6lack ft. Don Toliver"
        isLiked={false}
      />
    </div>
  );
}
export default SongBasePage;
