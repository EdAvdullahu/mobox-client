import { useState } from "react";
import ArrowPink from "../../../Assets/Svg/ArrowPink";
import classes from "./Player.module.css";
import Lyrics from "../../Lyrics/Lyrics";
import "../../../index.css";
import ScrollElement from "../../ScrollElement";

import { useSelector } from "react-redux";
import { SongState } from "../../../Store/SongsStore/songs_state";
import MusicController from "./MusicController";

interface PlayerProps {
 title?: string;
 artist?: string;
 isLiked?: boolean;
}

const Player: React.FC<PlayerProps> = (props: PlayerProps) => {
 const [lyricsAreVisable, setLAV] = useState(false); // state variable to keep track of lyrics visibility
 const [lyricsAv, setLAv] = useState(false); // state variable to keep track of the availability of lyrics

 const currentSong = useSelector(
  (state: SongState) => state.song?.CurrentSong ?? null
 );

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

 interface lyricSong {
  lyric: string;
  annotation: string;
 }

 const tempLyrics: lyricSong[] = [
  {
   lyric:
    "Lorem ipsum dolor sit amet consectetur. Sagittis sed scelerisque nulla adipiscing curabitur adipiscing a.",
   annotation:
    "Lorem ipsum dolor sit amet consectetur. Sagittis sed scelerisque nulla adipiscing curabitur adipiscing a.",
  },
  {
   lyric: "Vulputate vel ut imperdiet amet lacus.",
   annotation: "Vulputate vel ut imperdiet amet lacus.",
  },
  {
   lyric:
    "Cursus id eget enim amet mauris vivamus morbi a praesent. Dui habitasse a interdum pharetra posuere tincidunt tristique odio. Lorem ipsum dolor sit amet consectetur.",
   annotation:
    "Cursus id eget enim amet mauris vivamus morbi a praesent. Dui habitasse a interdum pharetra posuere tincidunt tristique odio. Lorem ipsum dolor sit amet consectetur.",
  },
  {
   lyric: "Sagittis sed scelerisque nulla adipiscing curabitur adipiscing a.",
   annotation:
    "Sagittis sed scelerisque nulla adipiscing curabitur adipiscing a.",
  },
  {
   lyric:
    "Lorem ipsum dolor sit amet consectetur. Sagittis sed scelerisque nulla adipiscing curabitur adipiscing a.",
   annotation:
    "Lorem ipsum dolor sit amet consectetur. Sagittis sed scelerisque nulla adipiscing curabitur adipiscing a.",
  },
  {
   lyric: "Vulputate vel ut imperdiet amet lacus.",
   annotation: "Vulputate vel ut imperdiet amet lacus.",
  },
  {
   lyric:
    "Cursus id eget enim amet mauris vivamus morbi a praesent. Dui habitasse a interdum pharetra posuere tincidunt tristique odio. Lorem ipsum dolor sit amet consectetur.",
   annotation:
    "Cursus id eget enim amet mauris vivamus morbi a praesent. Dui habitasse a interdum pharetra posuere tincidunt tristique odio. Lorem ipsum dolor sit amet consectetur.",
  },
  {
   lyric: "Sagittis sed scelerisque nulla adipiscing curabitur adipiscing a.",
   annotation:
    "Sagittis sed scelerisque nulla adipiscing curabitur adipiscing a.",
  },
 ];
 type CSSProperties = {
  [key: string]: string | number;
 };

 const lyricStyle: CSSProperties = {
  backgroundColor: "var(--neon-pink60)",
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
   </div>
   {lyricsAv && (
    <ScrollElement divStyle={lyricStyle} shadow={"rgb(0 0 0 / 0.5)"}>
     {tempLyrics.map((item, index) => (
      <Lyrics
       key={index}
       lyric={item.lyric}
       annotation={item.annotation}
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
