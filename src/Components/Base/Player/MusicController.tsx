import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SongState } from "../../../Store/SongsStore/songs_state";
import { SongActions } from "../../../Store/SongsStore/songs_reduces";
import PlayButton from "../../PlayButton";
import NextButton from "../../../Assets/Svg/NextButton";
import classes from "./Player.module.css";

type Props = {
 src: string;
};

const MusicController: React.FC<Props> = ({ src }) => {
 const audioRef = useRef<HTMLAudioElement>(null);
 const isPlaying = useSelector((state: SongState) => state.song.isPlaying);
 const [currentTime, setCurrentTime] = useState(0);
 const [duration, setDuration] = useState(0);
 const dispatch = useDispatch();

 const togglePlay = () => {
  if (audioRef.current) {
   if (isPlaying) {
    audioRef.current.pause();
   } else {
    audioRef.current.play();
   }
  }
  dispatch(SongActions.togglePlay());
 };
 // useEffect(() => {
 //  if (audioRef.current) {
 //   audioRef.current.play();
 //  }
 // }, [src, isPlaying]);
 useEffect(() => {
  if (audioRef.current) {
   if (!isPlaying) {
    audioRef.current.pause();
   } else {
    audioRef.current.play();
   }
  }
 }, [isPlaying]);

 const handleTimeUpdate = () => {
  if (audioRef.current) {
   setCurrentTime(audioRef.current.currentTime);
   setDuration(audioRef.current.duration);
  }
 };

 useEffect(() => {
  if (audioRef.current) {
   audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
  }
  return () => {
   if (audioRef.current) {
    audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
   }
  };
 }, []);

 const handleProgressClick = (e: React.MouseEvent<HTMLInputElement>) => {
  if (audioRef.current) {
   const percent = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
   audioRef.current.currentTime = percent * duration;
  }
 };

 return (
  <div>
   <audio ref={audioRef} src={src} />
   <div className={classes.controllers}>
    <div onClick={togglePlay}>
     <PlayButton></PlayButton>
    </div>
    <div>
     <NextButton></NextButton>
    </div>
   </div>
   <div>
    <div className={classes.time}>
     <span className={classes.time_item}>{formatTime(currentTime)}</span>{" "}
     <progress
      className={classes.time_bar}
      value={currentTime}
      max={duration}
      onClick={() => {
       handleProgressClick;
      }}
     />{" "}
     <span className={classes.time_item}>{formatTime(duration)}</span>
    </div>
   </div>
  </div>
 );
};

const formatTime = (time: number): string => {
 const minutes = Math.floor(time / 60);
 const seconds = Math.floor(time % 60);
 return `${padZero(minutes)}:${padZero(seconds)}`;
};

const padZero = (number: number): string => {
 return number.toString().padStart(2, "0");
};

export default MusicController;
