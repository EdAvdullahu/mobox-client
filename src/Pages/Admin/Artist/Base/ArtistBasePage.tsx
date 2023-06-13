import { Outlet } from "react-router-dom";
import ArtistNavigation from "../Components/Nav/ArtistNavigation";
import classes from "./ArtistBasePage.module.css";

function ArtistBasePage() {
 return (
  <div className={classes.main}>
   <div className={classes.navigation}>
    <ArtistNavigation />
   </div>
   <div className={classes.content}>
    <Outlet />
   </div>
  </div>
 );
}

export default ArtistBasePage;
