import Card from "../../../Components/Base/Card/Card";
import HeartNoFill from "../../../Assets/Svg/HeartNoFill";
import classes from "./Explore.module.css";
import { NavLink } from "react-router-dom";

const Explore = () => {
 return (
  <div className={classes.main}>
   <div className={classes.container}>
    <div className={classes.todayTop}>
     <div className={classes.today_img}>
      <img src="" alt="" />
     </div>
     <div className={classes.today_info}>
      <p>TODAY'S HOTTEST STINGLE</p>
      <div className={classes.today_title}>Acoustic Coffee Club</div>
      <div className={classes.today_info_inner}>
       {" "}
       This is som type of description
      </div>
      <div className={classes.buttons}>
       <div className={classes.play_now}>Play Now</div>
       <div className={classes.today_like}>
        <HeartNoFill />
       </div>
      </div>
     </div>
    </div>
    <div className={classes.trending}>
     <Card>
      <div className={classes.trending_inner}>
       <div className={classes.trending_info}>
        <div className={classes.artist_top}>Top Trending Artist</div>
        <div className={classes.artist_here}>
         here are the 3 top artists world wide{" "}
        </div>
       </div>
       <div className={classes.artists}>
        <div className={classes.artist}>
         <div className={classes.artist_img}></div>
         <div className={classes.artist_name}>My name is</div>
        </div>
        <div className={classes.artist}>
         <div className={classes.artist_img}></div>
         <div className={classes.artist_name}>My name is</div>
        </div>
        <div className={classes.artist}>
         <div className={classes.artist_img}></div>
         <div className={classes.artist_name}>My name is</div>
        </div>
       </div>
      </div>
     </Card>
    </div>
    <div className={classes.streamed}>
     <Card>
      <div className={classes.streamed_inner}>
       <div className={classes.streamed_header}>
        <div className={classes.top_songs}>Top songs played</div>
        <NavLink to={"/music/top-streams"} className={classes.seeAll}>
         see all
        </NavLink>
       </div>
       <div className={classes.top_songs_inner}>
        <div className={classes.top_song}>
         <div className={classes.order}>1</div>
         <div className={classes.top_img}></div>
         <div className={classes.top_title}>This will be the song title</div>
         <div className={classes.top_length}>2:36</div>
         <div className={classes.top_like}>
          <HeartNoFill />
         </div>
        </div>
        <div className={classes.top_song}>
         <div className={classes.order}>1</div>
         <div className={classes.top_img}></div>
         <div className={classes.top_title}>This will be the song title</div>
         <div className={classes.top_length}>2:36</div>
         <div className={classes.top_like}>
          <HeartNoFill />
         </div>
        </div>
        <div className={classes.top_song}>
         <div className={classes.order}>1</div>
         <div className={classes.top_img}></div>
         <div className={classes.top_title}>This will be the song title</div>
         <div className={classes.top_length}>2:36</div>
         <div className={classes.top_like}>
          <HeartNoFill />
         </div>
        </div>
        <div className={classes.top_song}>
         <div className={classes.order}>1</div>
         <div className={classes.top_img}></div>
         <div className={classes.top_title}>This will be the song title</div>
         <div className={classes.top_length}>2:36</div>
         <div className={classes.top_like}>
          <HeartNoFill />
         </div>
        </div>
       </div>
      </div>
     </Card>
    </div>
   </div>
  </div>
 );
};
export default Explore;
