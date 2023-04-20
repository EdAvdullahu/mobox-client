import { useState } from "react";
import classes from "./Search.module.css";
import SearchIcon from "../../Assets/Svg/SearchIcon";
import BaseBackground from "../Base/BaseBackground";

function Search() {
 const [isCollapsed, setCollapse] = useState(true);
 function handleClick() {
  if (isCollapsed) {
   setCollapse(false);
  }
 }
 function closeSearch() {
  setCollapse(true);
 }
 return (
  <div
   className={`${classes.search_wrapper} ${
    isCollapsed ? "" : classes.wrapper_open
   }`}
  >
   <BaseBackground></BaseBackground>
   <div className={classes.search_bar} onClick={handleClick}>
    <input
     type="text"
     className={classes.input}
     disabled={isCollapsed}
     placeholder="search"
    />
    <div className={classes.icon}>
     <SearchIcon></SearchIcon>
    </div>
    <div onClick={closeSearch} className={classes.close}>
     close
    </div>
   </div>
   <div className={classes.search_content}>conent</div>
  </div>
 );
}
export default Search;
