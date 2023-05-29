import Audio from "../../../Assets/Svg/Audio";
import { useEffect, useState } from "react";
import classes from "./Player.module.css";

type Props = {
 audioRef: React.RefObject<HTMLAudioElement>;
};
const AudioContrller: React.FC<Props> = ({ audioRef }) => {
 const [volume, setVolume] = useState(60);
 const [holdingState, setHoldingState] = useState(60);
 useEffect(() => {
  if (audioRef && audioRef.current) {
   audioRef.current.volume = volume / 100;
  }
 }, [volume, audioRef]);
 const handleVolumeChange = (e: HTMLInputElement) => {
  setVolume(+e.value);
  setHoldingState(+e.value);
 };
 const handleMute = () => {
  if (volume === 0) {
   setVolume(holdingState);
  } else {
   setVolume(0);
  }
 };
 return (
  <div className={classes.audio_wrapper}>
   <div className={classes.volume}>
    <div onClick={handleMute} className={classes.audio_icon}>
     <Audio />
    </div>
    <input
     type="range"
     min={0}
     max={100}
     value={volume}
     className={classes.volume_slider}
     onChange={(e) => handleVolumeChange(e.target)}
    />
   </div>
  </div>
 );
};
export default AudioContrller;
