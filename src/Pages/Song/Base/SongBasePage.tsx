import { useEffect, useRef } from "react";
import Player from "../../../Components/Base/Player/Player";
import Sidebar from "../../../Components/Base/Sidebar/Sidebar";
import classes from "./SongBasePage.module.css";
import { Outlet } from "react-router-dom";
import ApiCall from "../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import { useDispatch, useSelector } from "react-redux";
import { SongState } from "../../../Store/SongsStore/songs_state";
import { SongActions } from "../../../Store/SongsStore/songs_reduces";
import AudioContrller from "../../../Components/Base/Player/AudioController";

function SongBasePage() {
 const dispatch = useDispatch();
 const genres = useSelector((state: SongState) => state.song.genres);
 useEffect(() => {
  if (!genres) {
   ApiCall.get(ENDPOINTS.SONGS.GENRE.GET()).then((res) => {
    if (res.data.result) {
     dispatch(SongActions.SetGenres({ genres: res.data.result }));
    }
   });
  }
 }, [genres]);
 const audioRef = useRef<HTMLAudioElement>(null);
 return (
  <div className={classes.base}>
   <div className={classes.nav}>
    <Sidebar></Sidebar>
   </div>
   <div className={classes.content} id="song-portal-target">
    <Outlet />
   </div>
   <Player audioRef={audioRef} />
   <div className={classes.volume}>
    <AudioContrller audioRef={audioRef} />
   </div>
  </div>
 );
}
export default SongBasePage;
