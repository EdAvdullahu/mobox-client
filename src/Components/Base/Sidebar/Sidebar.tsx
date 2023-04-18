import CreateNewPlaylistIcon from "../../../Assets/Svg/CreateNewPlaylistIcon";
import FinderIcon from "../../../Assets/Svg/FinderIcon";
import LibraryIconGrey from "../../../Assets/Svg/LibraryIconGrey";
import LogoSvg from "../../../Assets/Svg/LogoSvg";
import MusicNoteGrey from "../../../Assets/Svg/MusicNoteGrey";
import classes from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
function Sidebar() {
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
              <LibraryIconGrey /> Llibrary A
            </div>
            <div className={classes.icon_wrapper}>
              <LibraryIconGrey /> Llibrary B
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
            <div className={classes.icon_wrapper}>
              <CreateNewPlaylistIcon /> Create New
            </div>
            <div className={classes.icon_wrapper}>
              <MusicNoteGrey /> Playlist X
            </div>
            <div className={classes.icon_wrapper}>
              <MusicNoteGrey /> Playlist Y
            </div>
            <div className={classes.icon_wrapper}>
              <MusicNoteGrey /> Playlist Z
            </div>
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
              click here to find a song through melodies that are playing on to
              the mic
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
