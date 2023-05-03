import { ISong } from "../../types/ISong";
import classes from "./PlaylistLIstItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { SongActions } from "../../../../Store/SongsStore/songs_reduces";
import HeartFill from "../../../../Assets/Svg/HeartFill";
import HeartNoFill from "../../../../Assets/Svg/HeartNoFill";
import ApiCall from "../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../Common/Api/ENDPOINTS";
import { RootState } from "../../../../Store/UserStore/user_state";
import { UserActions } from "../../../../Store/UserStore/user_reducer";
import { IPlaylist } from "../../types/IPlaylist";

function PlayListListItem({
 song,
 order,
 playlist,
}: {
 song: ISong;
 order: number;
 playlist: IPlaylist;
}) {
 function formatDuration(duration: string) {
  const [hours, minutes, seconds] = duration.split(":").map(Number);
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return `${
   hours > 0 ? hours + ":" : ""
  }${formattedMinutes}:${formattedSeconds}`;
 }
 function handleMouseOver(id: number) {}
 const dispatch = useDispatch();
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
  currentlyPlayingFrom: playlist,
  orderBy: null,
  asc: false,
  type: "RELEASE",
 };
 function setPlayingSong() {
  dispatch(SongActions.setCurrentPlayingSong(SongState));
 }
 const userId = useSelector((state: RootState) => state.user.user?.id);

 const likeDislikeSong = () => {
  if (song.isLiked) {
   ApiCall.deleteNoAuth(ENDPOINTS.SONG.DISLIKE(song.likedId), null).then(
    (res) => {
     if (res.data.result) {
      dispatch(UserActions.removeLikedSongs(song.likedId));
     }
    }
   );
  } else {
   const likeS = {
    userId: userId,
    songId: song.songId,
   };
   ApiCall.postNoAuth(ENDPOINTS.SONG.LIKE(), likeS).then((res) => {
    if (res.data.result) {
     if (userId) {
      ApiCall.getNoAuth(ENDPOINTS.USER.LIKES(+userId), null).then((res) => {
       if (res.data.isSuccess && res.data.result) {
        dispatch(UserActions.resetLikedSongs(res.data.result));
       }
      });
     }
     song.isLiked = true;
    }
   });
  }
 };
 return (
  <div>
   <div className={classes.main}>
    <div className={classes.order}>{order + 1}</div>
    <div className={classes.song}>
     <div
      onMouseOver={() => {
       handleMouseOver(song.songId);
      }}
      className={classes.song_img}
      onClick={() => {
       setPlayingSong();
      }}
     >
      <img src={song.imageUrl} alt={song.name} />
     </div>
     <div className={classes.song_info}>
      <p className={classes.title}>{song.name}</p>
      {song.features.map((feature) => (
       <p key={feature.artistId}>{feature.name}</p>
      ))}
     </div>
    </div>
    <div className={classes.album}>
     <p>{song.release.title}</p>
    </div>
    <div>
     <p>{formatDuration(song.length)}</p>
    </div>
    <div onClick={likeDislikeSong}>
     {song.isLiked ? <HeartFill /> : <HeartNoFill />}
    </div>
   </div>
  </div>
 );
}
export default PlayListListItem;
