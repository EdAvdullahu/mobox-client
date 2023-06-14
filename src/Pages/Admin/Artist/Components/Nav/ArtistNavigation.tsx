import { NavLink } from "react-router-dom";
import classes from "./ArtistNavigation.module.css";
import LogoSvg from "../../../../../Assets/Svg/LogoSvg";

function ArtistNavigation() {
 const links = [
  {
   legend: "statistics",
   routes: [
    { name: "Songs", path: "/admin/artist/statistics/songs" },
    { name: "Releases", path: "/admin/artist/statistics/releases" },
    { name: "Artist", path: "/admin/artist/statistics/artist" },
   ],
  },
  {
   legend: "New",
   routes: [
    { name: "Release", path: "/admin/artist/new/release" },
    { name: "Lyrics", path: "/admin/artist/new/lyrics" },
   ],
  },
  {
   legend: "edit",
   routes: [
    { name: "Songs", path: "/music" },
    { name: "Releases", path: "/music" },
    { name: "Lyrics", path: "/music" },
   ],
  },
 ];
 return (
  <div className={classes.nav}>
   <div className={classes.admin}>
    <LogoSvg />
   </div>
   <div className={classes.links}>
    <NavLink to={"/music"} className={classes.go_home}>
     Home
    </NavLink>
    <NavLink to={"/music"} className={classes.go_home}>
     Profile
    </NavLink>
    {links.map((item: any, index: number) => (
     <fieldset className={classes.link_group} key={index}>
      <legend className={classes.legend}>{item?.legend}</legend>
      {item?.routes?.map((route: any, rno: number) => (
       <NavLink className={classes.link} to={route?.path} key={rno}>
        {route?.name}
       </NavLink>
      ))}
     </fieldset>
    ))}
   </div>
  </div>
 );
}
export default ArtistNavigation;
