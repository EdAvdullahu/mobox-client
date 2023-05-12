import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Store/UserStore/user_state";
import { UserActions } from "../../../../Store/UserStore/user_reducer";
import { IPlaylist } from "../../types/IPlaylist";
import { SongActions } from "../../../../Store/SongsStore/songs_reduces";
import { SongState } from "../../../../Store/SongsStore/songs_state";
import ApiCall from "../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../Common/Api/ENDPOINTS";
import classes from "./ReleaseListItem.module.css";
import HeartFill from "../../../../Assets/Svg/HeartFill";
import HeartNoFill from "../../../../Assets/Svg/HeartNoFill";
import { NavLink } from "react-router-dom";
import { formatLikedSongs } from "../../../../Common/Services/comon.services";
import { ReleaseState } from "../../../../Store/ReleaseStore/release_state";
import { Song } from "../../types/IArtist";

interface Props {
 song: Song;
 order: number;
}

function ReleaseListItem({ song, order }: Props) {
 const playlist = useSelector((state: ReleaseState) => state.release.release);

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
  console.log("PLAYLIST", playlist);
  const songState = {
   CurrentSong: {
    ...song,
    release: {
     releaseId: playlist?.releaseId || 0, // Assign a default value when releaseId is undefined
     title: playlist?.title || "",
    },
   },
   currentlyPlayingFrom: { ...playlist, playlistId: playlist?.releaseId },
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
    console.log(res.data);
    if (res.data.result) {
     if (userId) {
      ApiCall.getNoAuth(ENDPOINTS.USER.LIKES(+userId), null).then((res) => {
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

 return (
  <div
   onMouseLeave={() => {
    handleMouseLeave();
   }}
   onMouseOver={() => {
    handleMouseOver();
   }}
  >
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
     <p>{playlist?.title}</p>
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

export default ReleaseListItem;
