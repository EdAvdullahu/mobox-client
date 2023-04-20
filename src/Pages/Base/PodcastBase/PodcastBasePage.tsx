import Sidebar from "../../../Components/Base/Sidebar/Sidebar";
import Card from "../../../Components/Base/Card/Card";
import classes from "../SongBase/SongBasePage.module.css";
function PodcastBasePage() {
  return (
    <div className={classes.base}>
      <div className={classes.nav}>
        <Sidebar></Sidebar>
      </div>
      <div className={classes.content}>
        <Card>
          <div>This is testing my card</div>
        </Card>
        <Card>
          <div>This is me testing another card</div>
        </Card>
      </div>
      <div className={classes.section}> NAVIGATION</div>
    </div>
  );
}
export default PodcastBasePage;
