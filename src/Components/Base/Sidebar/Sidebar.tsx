import { useSelector } from "react-redux";
import CreateNewPlaylistIcon from "../../../Assets/Svg/CreateNewPlaylistIcon";
import FinderIcon from "../../../Assets/Svg/FinderIcon";
import LibraryIconGrey from "../../../Assets/Svg/LibraryIconGrey";
import LogoSvg from "../../../Assets/Svg/LogoSvg";
import MusicNoteGrey from "../../../Assets/Svg/MusicNoteGrey";
import classes from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../Store/UserStore/user_state";
import HeartFill from "../../../Assets/Svg/HeartFill";
import { useState } from "react";
import NewPlaylist from "../../../Pages/Song/Playlist/NewPlaylist/NewPlaylist";
import Portal from "../../../Components/Portal/Portal";

function Sidebar() {
 const [createPlaylist, setCreatePlaylist] = useState(false);

 const playlists = useSelector((state: RootState) => state.user.playlists);
 const handleToggle = () => {
  setCreatePlaylist(!createPlaylist);
 };
 return (
  <div className={classes.sidebar}>
   <div className={classes.logo}>
    <LogoSvg />
   </div>
   <div className={classes.menus}>
    <div className={classes.menu_item}>
     <div className={classes.menu_item_title}>Menu</div>
     <div className={classes.menu_item_list}>
      <div>
       <NavLink to="/music"> Explore</NavLink>
      </div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
      <div>Item 6</div>
     </div>
    </div>
    <div className={classes.menu_item}>
     <div className={classes.menu_item_title}>Library</div>
     <div className={classes.menu_item_list}>
      <div className={classes.icon_wrapper}>
       <NavLink to={"/music/library/liked"}>
        <HeartFill /> Liked Songs
       </NavLink>
      </div>
      <div className={classes.icon_wrapper}>
       <LibraryIconGrey /> Llibrary C
      </div>
      <div className={classes.icon_wrapper}>
       <LibraryIconGrey /> Llibrary D
      </div>
      <div className={classes.icon_wrapper}>
       <LibraryIconGrey /> Llibrary E
      </div>
     </div>
    </div>
    <div className={classes.menu_item}>
     <div className={classes.menu_item_title}>Playlist</div>
     <div className={classes.menu_item_list}>
      <div
       className={classes.icon_wrapper}
       style={{ cursor: "pointer" }}
       onClick={handleToggle}
      >
       <CreateNewPlaylistIcon /> Create New
      </div>
      {createPlaylist && (
       <Portal>
        <NewPlaylist handleToggle={handleToggle} />
       </Portal>
      )}
      {playlists?.map((item: any, index: number) => (
       <div key={index} className={classes.icon_wrapper}>
        <MusicNoteGrey />
        <NavLink to={"/music/playlist/" + item.playlitId}>
         {item.tittle}
        </NavLink>
       </div>
      ))}
     </div>
    </div>
   </div>
   <div className={classes.finder}>
    <div className={classes.finder_body}>
     <div className={classes.finder_body_icon}>
      <FinderIcon />
     </div>
     <div className={classes.finder_body_content}>
      <h3>Find music</h3>
      <p>
       click here to find a song through melodies that are playing on to the mic
      </p>
     </div>
    </div>
   </div>
  </div>
 );
}
export default Sidebar;
