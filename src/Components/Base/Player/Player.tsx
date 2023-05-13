import { useEffect, useState } from "react";
import ArrowPink from "../../../Assets/Svg/ArrowPink";
import classes from "./Player.module.css";
import Lyrics from "../../Lyrics/Lyrics";
import "../../../index.css";
import ScrollElement from "../../ScrollElement";

import { useDispatch, useSelector } from "react-redux";
import { SongState } from "../../../Store/SongsStore/songs_state";
import MusicController from "./MusicController";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import ApiCall from "../../../Common/Api/ApiCall";
import { Lyric } from "../../../Pages/Song/types/ILyrics";
import { SongActions } from "../../../Store/SongsStore/songs_reduces";

interface PlayerProps {
 title?: string;
 artist?: string;
 isLiked?: boolean;
}

const Player: React.FC<PlayerProps> = (props: PlayerProps) => {
 const [lyricsAreVisable, setLAV] = useState(false); // state variable to keep track of lyrics visibility
 const [lyricsAv, setLAv] = useState(false); // state variable to keep track of the availability of lyrics
 const dispatch = useDispatch();
 const currentSong = useSelector(
  (state: SongState) => state.song?.CurrentSong ?? null
 );
 const lyrics = useSelector((state: SongState) => state.song.lyrics ?? null);
 useEffect(() => {
  const fetchLyrics = async () => {
   if (currentSong?.songId) {
    try {
     const response = await ApiCall.getNoAuth(
      ENDPOINTS.LYRICS.BY_SONG(currentSong?.songId + ""),
      null
     );
     const lyrics: Lyric = response.data.result;
     if (!lyrics) {
      setLAV(false);
      setTimeout(() => {
       setLAv(false);
      }, 500);
     }
     console.log("LYRICS", lyrics);
     dispatch(SongActions.SetLyrics({ lyrics: lyrics }));
    } catch (error) {
     console.error("Error retrieving song lyrics:", error);
    }
   }
  };

  fetchLyrics();
 }, [currentSong?.songId]);
 /**
  * This function toggles the visibility of lyrics.
  *
  * @returns void
  */
 function displayLyrics(): void {
  setLAV(!lyricsAreVisable);
  if (!lyricsAv) {
   setLAv(true);
  } else {
   setTimeout(() => {
    setLAv(false);
   }, 500); // hide lyrics after 500ms
  }
 }

 type CSSProperties = {
  [key: string]: string | number;
 };

 const lyricStyle: CSSProperties = {
  backgroundColor: "var(--neon-pink90)",
  marginTop: "20px",
  height: "calc(100% - 100px)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px 0",
  overflow: "auto",
 };

 // set active annotation
 const [activeLyricIndex, setActiveLyricIndex] = useState(-1);
 const handleClick = (index: number) => {
  setActiveLyricIndex(index);
 };

 return (
  <div
   className={`${classes.wrapper} ${
    lyricsAreVisable ? classes.wrapper_open : ""
   }`}
  >
   <div className={classes.song_wrapper}>
    <div className={classes.song_info}>
     <div className={classes.song_info_img}></div>
     <div className={classes.song_info_text}>
      <h3>{currentSong?.name}</h3>
      <p>{currentSong?.features[0].name}</p>
     </div>
    </div>
    <div className={classes.control_wrapper}>
     {currentSong && (
      <MusicController
       src={currentSong?.path ? currentSong?.path : ""}
      ></MusicController>
     )}
    </div>
    {lyrics && (
     <div className={classes.lyrics} onClick={displayLyrics}>
      <div
       className={`${classes.array} ${
        lyricsAreVisable ? classes.array_open : ""
       }`}
      >
       <ArrowPink></ArrowPink>
      </div>
      Lyrics
     </div>
    )}
   </div>
   {lyricsAv && (
    <ScrollElement divStyle={lyricStyle} shadow={"rgb(0 0 0 / 0.5)"}>
     {lyrics?.verses?.map((item, index) => (
      <Lyrics
       key={index}
       lyric={item.text}
       annotation={item.annotation.annotationText}
       isActive={activeLyricIndex === index}
       onClick={() => handleClick(index)}
      ></Lyrics>
     ))}
    </ScrollElement>
   )}
  </div>
 );
};

export default Player;
