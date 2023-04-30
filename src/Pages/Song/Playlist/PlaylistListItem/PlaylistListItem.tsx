import { useState } from "react";
import { ISong } from "../../types/ISong";
import classes from "./PlaylistLIstItem.module.css";
import { useDispatch } from "react-redux";
import { SongActions } from "../../../../Store/SongsStore/songs_reduces";

function PlayListListItem({ song, order }: { song: ISong; order: number }) {
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
 const SongState: ISongState = {
  CurrentSong: song,
 };
 function setPlayingSong() {
  dispatch(SongActions.setCurrentPlayingSong(SongState));
  console.log("called", song);
 }
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
    <div></div>
   </div>
  </div>
 );
}
export default PlayListListItem;
