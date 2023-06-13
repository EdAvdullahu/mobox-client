import { NavLink } from "react-router-dom";
import classes from "./ArtistNavigation.module.css";
import LogoSvg from "../../../../../Assets/Svg/LogoSvg";

function ArtistNavigation() {
 const links = [
  {
   legend: "statistics",
   routes: [
    { name: "Songs", path: "/music" },
    { name: "Releases", path: "/music" },
    { name: "Career", path: "/music" },
    { name: "Listeners", path: "/music" },
   ],
  },
  {
   legend: "New",
   routes: [
    { name: "Release", path: "/music" },
    { name: "Song", path: "/music" },
    { name: "Lyrics", path: "/music" },
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
