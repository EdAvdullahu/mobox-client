import { useEffect, useState } from "react";
import SearchIcon from "../../../Assets/Svg/SearchIcon";
import classes from "./Header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import useDebounce from "../../../Hooks/useDebounce";
import { useDispatch } from "react-redux";
import { SearchActions } from "../../../Store/Search/search_reducer";
function Header() {
 const location = useLocation();
 const currentPath = location.pathname;

 const [search, setSearch] = useState("");
 const debouncer = useDebounce(search, 500);
 const displatch = useDispatch();
 useEffect(() => {
  displatch(SearchActions.SetSearchParam({ searchParam: debouncer }));
 }, [debouncer]);
 return (
  <div className={classes.header}>
   <div className={classes.header_item}>
    <NavLink to={"/music/search"}>
     <div className={classes.search_bar}>
      <input
       type="text"
       className={classes.input}
       placeholder="search"
       autoFocus={true}
       onChange={(e) => {
        setSearch(e.target.value);
       }}
      />
      <div className={classes.icon}>
       <SearchIcon></SearchIcon>
      </div>
     </div>
    </NavLink>
   </div>
   <div className={classes.header_item} style={{ zIndex: 10000 }}>
    <div className={classes.premium}>Get Premium</div>
    <div>
     <NavLink to="/music" className={classes.link}>
      Music
      {currentPath.includes("/music") && <div className={classes.active}></div>}
     </NavLink>
    </div>
    <div>
     <NavLink to="/podcast" className={classes.link}>
      Podcast
      {currentPath === "/podcast" && <div className={classes.active}></div>}
     </NavLink>
    </div>
    <div>Lang</div>
   </div>
  </div>
 );
}
export default Header;
