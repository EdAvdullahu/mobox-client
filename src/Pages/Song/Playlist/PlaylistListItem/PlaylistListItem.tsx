import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Store/UserStore/user_state";
import { UserActions } from "../../../../Store/UserStore/user_reducer";
import { ISong } from "../../types/ISong";
import { IPlaylist } from "../../types/IPlaylist";
import { SongActions } from "../../../../Store/SongsStore/songs_reduces";
import { SongState } from "../../../../Store/SongsStore/songs_state";
import ApiCall from "../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../Common/Api/ENDPOINTS";
import classes from "./PlaylistLIstItem.module.css";
import HeartFill from "../../../../Assets/Svg/HeartFill";
import HeartNoFill from "../../../../Assets/Svg/HeartNoFill";
import { NavLink } from "react-router-dom";
import { formatLikedSongs } from "../../../../Common/Services/comon.services";
import Cancel from "../../../../Assets/Svg/Cancel";
import { ToastContainer, toast } from "react-toastify";

interface Props {
 song: ISong;
 order: number;
 playlist: IPlaylist;
 canDelete: boolean | undefined;
 handleRemove: () => void;
}

function PlayListListItem({
 song,
 order,
 playlist,
 canDelete,
 handleRemove,
}: Props) {
 // Format duration as hh:mm:ss
 function formatDuration(duration: string): string {
  const [hours, minutes, seconds] = duration.split(":").map(Number);
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return `${
   hours > 0 ? hours + ":" : ""
  }${formattedMinutes}:${formattedSeconds}`;
 }

 // Handle hover events
 const currentlyPlayingSong = useSelector(
  (state: SongState) => state.song.CurrentSong
 );
 const isSongPlaying = useSelector((state: SongState) => state.song.isPlaying);
 const [isPlaying, setIsPlaying] = useState(false);
 const [isOver, setIsOver] = useState(false);

 function handleMouseOver() {
  setIsOver(true);
  setIsPlaying(song.songId === currentlyPlayingSong?.songId && isSongPlaying);
 }

 function handleMouseLeave() {
  setIsOver(false);
 }

 const dispatch = useDispatch();

 function setPlayingSong() {
  const songState = {
   CurrentSong: song,
   currentlyPlayingFrom: playlist,
   orderBy: null,
   asc: false,
   type: "RELEASE",
  };
  dispatch(SongActions.setCurrentPlayingSong(songState));
  setIsPlaying(!isPlaying);
 }

 const userId = useSelector((state: RootState) => state.user.user?.id);

 function likeDislikeSong() {
  if (song.isLiked) {
   ApiCall.delete(ENDPOINTS.USER.SONGS.LIKES.DISLIKE(song.likedId), null).then(
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
   ApiCall.post(ENDPOINTS.USER.SONGS.LIKES.LIKE(), likeS).then((res) => {
    console.log(res.data);
    if (res.data.result) {
     if (userId) {
      ApiCall.get(ENDPOINTS.USER.LIKES(+userId)).then((res) => {
       if (res.data.isSuccess && res.data.result) {
        const Playlist: IPlaylist = {
         playlistId: "",
         isPublic: false,
         title: "Liked Songs",
         ownerId: 0,
         description: "A list of liked songs",
         songs: formatLikedSongs(res.data.result),
        };
        dispatch(UserActions.resetLikedSongs(Playlist));
       }
      });
     }
     song.isLiked = true;
    }
   });
  }
 }

 const removeFromPlaylist = async () => {
  if (song.songPlaylistId) {
   try {
    const res = await ApiCall.delete(
     ENDPOINTS.USER.SONGS.PLAYLISTS.DELETE_SONG(song.songPlaylistId),
     null
    );
    if (res.data.result) {
     handleRemove();
     toast.success("Song removed from playlist", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
     });
    } else {
     logError();
    }
   } catch (error) {
    logError();
   }
  }
 };
 const logError = () => {
  toast.error("Something went wrong", {
   position: "top-center",
   autoClose: 2000,
   hideProgressBar: true,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "light",
  });
 };

 return (
  <div
   onMouseLeave={() => {
    handleMouseLeave();
   }}
   onMouseOver={() => {
    handleMouseOver();
   }}
  >
   <ToastContainer />
   <div className={classes.main}>
    <div className={classes.order}>{order + 1}</div>
    <div className={classes.song}>
     <div
      className={classes.song_img}
      onClick={() => {
       setPlayingSong();
      }}
     >
      {isOver && (
       <div className={classes.playing_state}>
        <div className={classes.play_wrapper}>
         <div
          className={`${classes.player} ${isPlaying ? classes.paused : ""}`}
         ></div>
        </div>
       </div>
      )}
      <img src={song.imageUrl} alt={song.name} />
     </div>
     <div className={classes.song_info}>
      <p className={classes.title}>{song.name}</p>
      {song.features.map((feature) => (
       <p key={feature.artistId}>
        <NavLink to={"/music/artist/" + feature.artistId}>
         {feature.name}
        </NavLink>
       </p>
      ))}
     </div>
    </div>
    <div className={classes.album}>
     <p>{song.release.title}</p>
    </div>
    <div>
     <p>{formatDuration(song.length)}</p>
    </div>
    <div className={classes.icon} onClick={likeDislikeSong}>
     {song.isLiked ? <HeartFill /> : <HeartNoFill />}
    </div>
    {canDelete && (
     <div onClick={removeFromPlaylist} className={classes.icon}>
      <Cancel />
     </div>
    )}
   </div>
  </div>
 );
}

export default PlayListListItem;
