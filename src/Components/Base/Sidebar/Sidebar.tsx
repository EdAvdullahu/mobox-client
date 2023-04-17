import FinderIcon from "../../../Assets/Svg/FinderIcon";
import LogoSvg from "../../../Assets/Svg/LogoSvg";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <LogoSvg />
      </div>
      <div className="menus">
        <div className="menu-item">
          <div className="menu-item-title">Menu</div>
          <div className="menu-item-list">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
            <div>Item 6</div>
          </div>
        </div>
        <div className="menu-item">
          <div className="menu-item-title">Library</div>
          <div className="menu-item-list">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
            <div>Item 6</div>
          </div>
        </div>
        <div className="menu-item">
          <div className="menu-item-title">Playlist</div>
          <div className="menu-item-list">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
            <div>Item 6</div>
          </div>
        </div>
      </div>
      <div className="finder">
        <div className="finder-body">
          <div className="finder-body-icon">
            <FinderIcon />
          </div>
          <div className="finder-body-content">
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
