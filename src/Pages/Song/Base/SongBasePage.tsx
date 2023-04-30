import Player from "../../../Components/Base/Player/Player";
import Sidebar from "../../../Components/Base/Sidebar/Sidebar";
import Card from "../../../Components/Base/Card/Card";
import classes from "./SongBasePage.module.css";
import { Outlet } from "react-router-dom";
import ScrollElement from "../../../Components/ScrollElement";
function SongBasePage() {
 type CSSProperties = {
  [key: string]: string | number;
 };
 const innerContent: CSSProperties = {
  height: "calc(100% - 300px)",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
 };
 return (
  <div className={classes.base}>
   <div className={classes.nav}>
    <Sidebar></Sidebar>
   </div>
   <div className={classes.content}>
    {/* <ScrollElement divStyle={innerContent} shadow={"rgb(250 40 112 / 0.3)"}>
          <Outlet />
        </ScrollElement> */}
    <Outlet />
   </div>
   <Player title="Temporary" artist="6lack ft. Don Toliver" isLiked={false} />
  </div>
 );
}
export default SongBasePage;
