import ArrowPink from "../../../../Assets/Svg/ArrowPink";
import HeartFill from "../../../../Assets/Svg/HeartFill";
import classes from "./LikedSons.module.css";
import { formatDate } from "../../../../Common/Services/comon.services";
import ApiCall from "../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../Common/Api/ENDPOINTS";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../../../Store/UserStore/user_reducer";
import { SongActions } from "../../../../Store/SongsStore/songs_reduces";
import { ISong } from "../../types/ISong";
import { RootState } from "@/Store/UserStore/user_state";

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

 const likedSongs = useSelector((state: RootState) => state.user.likedSongs);

 interface ISongState {
  CurrentSong: ISong;
 }
 interface CurrentSongState {
  currentlyPlayingFrom: any;
  orderBy: string | null;
  asc: boolean;
  type: string | null;
 }
 const SongState: ISongState & CurrentSongState = {
  CurrentSong: song,
  currentlyPlayingFrom: likedSongs,
  orderBy: null,
  asc: false,
  type: "LIKED",
 };

 const setCurrentlyPlaying = () => {
  dispatch(SongActions.setCurrentPlayingSong(SongState));
 };
 const removeFromLikes = () => {
  try {
   ApiCall.deleteNoAuth(ENDPOINTS.SONG.DISLIKE(song?.likedId), null).then(
    (res) => {
     if (res.data.result === true) {
      dispatch(UserActions.removeLikedSongs(song?.likedId));
     } else {
      console.log("SMETHING WENT WRONG");
     }
    }
   );
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
     onClick={setCurrentlyPlaying}
     className={`${classes.song_img} ${
      active === order ? classes.img_active : ""
     }`}
    >
     <img src={song?.imageUrl} alt={song.name} />
    </div>
    <div className={classes.song_text}>
     <div className={classes.song_title}>{song.name}</div>
     <div className={classes.genres}>
      {song?.features?.map((item: any, index: number) => (
       <div key={index}>
        {item?.feature?.name ||
         item?.name + (index === song?.features?.length - 1 ? " " : ", ")}
       </div>
      ))}
     </div>
     <div className={classes.genres}>
      {song?.genres?.map((item: any, index: number) => (
       <div key={index}>
        {item?.genre?.name ||
         item?.name + (index === song?.genres?.length - 1 ? " " : ", ")}
       </div>
      ))}
     </div>
     <div>{formatDate(song?.releaseDate)}</div>
     <div>{song?.isExplicit ? "Explicit" : "Not Explicit"}</div>
    </div>
   </div>
   <div style={{ width: style.release + "%" }} className={classes.release}>
    {song?.release?.title}
   </div>
   <div style={{ width: style.date + "%" }} className={classes.date}>
    {formatDate(song?.likeDateTime)}
   </div>
   <div style={{ width: style.duration + "%" }} className={classes.duration}>
    {song?.length}
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
