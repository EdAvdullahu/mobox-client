import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SongState } from "../../../Store/SongsStore/songs_state";
import { SongActions } from "../../../Store/SongsStore/songs_reduces";
import PlayButton from "../../PlayButton";
import NextButton from "../../../Assets/Svg/NextButton";
import classes from "./Player.module.css";
import PreviousButton from "../../../Assets/Svg/PreviousButton";
import RepeatSongButton from "../../../Assets/Svg/RepeatSongButton";
import RepeatButtonActive from "../../../Assets/Svg/RepeatButton";
import RepeatButtonUnactive from "../../../Assets/Svg/RepeatButtonUnactive";
import ShuffleButtonActive from "../../../Assets/Svg/ShuffleButtonActive";
import ShuffleButton from "../../../Assets/Svg/ShuffleButton";
import useDebounce from "../../../Hooks/useDebounce";
import ApiCall from "../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import COOKIE from "../../../Common/Services/cookie.service";

type Props = {
 src: string;
 audioRef: React.RefObject<HTMLAudioElement>;
};

const MusicController: React.FC<Props> = ({ src, audioRef }) => {
 // const audioRef = useRef<HTMLAudioElement>(null);
 const isPlaying = useSelector((state: SongState) => state.song.isPlaying);
 const currentSong = useSelector((state: SongState) => state.song.CurrentSong);
 const replaySong = useSelector(
  (state: SongState) => state.song.isRepeatingSong
 );
 const replayPlaylist = useSelector(
  (state: SongState) => state.song.isRepeatingPlaylist
 );
 const shuffle = useSelector((state: SongState) => state.song.isShuffle);
 const [currentTime, setCurrentTime] = useState(0);
 const [duration, setDuration] = useState(0);
 const dispatch = useDispatch();
 const userId = COOKIE.getCookie("userId");

 // play/pause song
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

 // song controller setup
 const playNext = () => {
  dispatch(SongActions.PlayNextSong());
 };
 const playPrevious = () => {
  dispatch(SongActions.PlayPreviousSong());
 };
 const toggleRepeat = () => {
  dispatch(SongActions.ToggleRepeat());
 };
 const toggleShuffeling = () => {
  dispatch(SongActions.ToggleShuffeling());
 };
 const PlayNextEvent = () => {
  if (!replaySong) {
   dispatch(SongActions.PlayNextEvent());
  } else {
   audioRef.current?.play();
  }
 };

 // start/pause song when isPlaying ore currentSong changes
 useEffect(() => {
  setTimeout(() => {
   if (audioRef.current) {
    if (!isPlaying) {
     audioRef.current.pause();
    } else {
     audioRef.current.play();
    }
   }
  }, 200);
 }, [isPlaying, currentSong]);

 // make API call after 20sec that a song has been playing
 const debouncer = useDebounce(currentSong, 20000);
 useEffect(() => {
  const sendStream = async () => {
   try {
    const res = await ApiCall.post(ENDPOINTS.USER.SONGS.STREAM(), {
     userId: userId,
     songId: currentSong?.songId,
    });
    console.log("STREAM RESULT", res.data.result);
   } catch (error) {
    console.error(error);
   }
  };

  if (debouncer) {
   sendStream();
  }
 }, [debouncer]);

 // time update on progressbar
 const handleTimeUpdate = () => {
  if (audioRef.current) {
   setCurrentTime(audioRef.current.currentTime);
   setDuration(audioRef.current.duration);
  }
 };

 // "infinite loop" for time update
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

 // set time at position clicked on progress bar
 const handleProgressClick = (
  e: React.MouseEvent<HTMLInputElement, MouseEvent>
 ) => {
  console.log("CALLED");
  if (audioRef.current) {
   const percent = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
   console.log("PERCENT", percent);
   audioRef.current.currentTime = percent * duration;
  }
 };

 return (
  <div>
   <audio ref={audioRef} src={currentSong?.path} onEnded={PlayNextEvent} />
   <div className={classes.controllers}>
    <div onClick={toggleShuffeling}>
     {shuffle ? <ShuffleButtonActive /> : <ShuffleButton />}
    </div>
    <div onClick={playPrevious}>
     <PreviousButton />
    </div>
    <div onClick={togglePlay}>
     <PlayButton></PlayButton>
    </div>
    <div onClick={playNext}>
     <NextButton></NextButton>
    </div>
    <div onClick={toggleRepeat}>
     {replayPlaylist ? (
      <RepeatButtonActive />
     ) : replaySong ? (
      <RepeatSongButton />
     ) : (
      <RepeatButtonUnactive />
     )}
    </div>
   </div>
   <div>
    <div className={classes.time}>
     <span className={classes.time_item}>{formatTime(currentTime)}</span>{" "}
     <input
      type="range"
      className={classes.time_bar}
      value={currentTime}
      max={duration}
      onClick={(e) => {
       handleProgressClick(e);
      }}
     />{" "}
     {duration && (
      <span className={classes.time_item}>{formatTime(duration)}</span>
     )}
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
