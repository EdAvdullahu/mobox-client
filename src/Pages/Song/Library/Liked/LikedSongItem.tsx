import ArrowPink from "../../../../Assets/Svg/ArrowPink";
import HeartFill from "../../../../Assets/Svg/HeartFill";
import classes from "./LikedSons.module.css";
import { formatDate } from "../../../../Common/Services/comon.services";
import ApiCall from "../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../Common/Api/ENDPOINTS";
import { useDispatch } from "react-redux";
import { UserActions } from "../../../../Store/UserStore/user_reducer";

function LikedSongItem({
 song,
 order,
 active,
 onClick,
}: {
 song: any;
 order: number;
 active: number | null;
 onClick: () => void;
}) {
 const style = {
  order: 3,
  info: 40,
  release: 20,
  date: 15,
  duration: 8,
  heart: 8,
  actions: 6,
 };

 const dispatch = useDispatch();
 const removeFromLikes = () => {
  try {
   ApiCall.deleteNoAuth(ENDPOINTS.SONG.DISLIKE(song?.id), null).then((res) => {
    if (res.data.result === true) {
     dispatch(UserActions.removeLikedSong(song?.id));
    } else {
     console.log("SMETHING WENT WRONG");
    }
   });
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <div
   className={`${classes.song_item} ${
    active === order ? classes.song_active : ""
   }`}
  >
   <div style={{ width: style.order + "%" }}>{order}</div>
   <div style={{ width: style.info + "%" }} className={classes.song_info}>
    <div
     className={`${classes.song_img} ${
      active === order ? classes.img_active : ""
     }`}
    >
     <img src={song?.song?.imageUrl} alt={song.song.name} />
    </div>
    <div className={classes.song_text}>
     <div className={classes.song_title}>{song.song.name}</div>
     <div className={classes.genres}>
      {song?.song?.genres?.map((item: any, index: number) => (
       <div key={index}>
        {item?.genre?.name +
         (index === song?.song?.genres?.length - 1 ? " " : ", ")}
       </div>
      ))}
     </div>
     <div>{formatDate(song?.song?.releaseDate)}</div>
     <div>{song?.song?.isExplicit ? "Explicit" : "Not Explicit"}</div>
    </div>
   </div>
   <div style={{ width: style.release + "%" }} className={classes.release}>
    {song?.song?.release?.title}
   </div>
   <div style={{ width: style.date + "%" }} className={classes.date}>
    {formatDate(song?.likeDateTime)}
   </div>
   <div style={{ width: style.duration + "%" }} className={classes.duration}>
    {song?.song?.length}
   </div>
   <div style={{ width: style.heart + "%" }}>
    <div onClick={removeFromLikes}>
     <HeartFill />
    </div>
   </div>
   <div className={classes.arrow}>
    <div
     onClick={onClick}
     className={`${classes.arrow_base} ${
      active === order ? "" : classes.arrow_active
     }`}
    >
     <ArrowPink />
    </div>
    <div>...</div>
   </div>
  </div>
 );
}
export default LikedSongItem;
