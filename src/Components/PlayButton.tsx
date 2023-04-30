import { useSelector } from "react-redux";
import { SongState } from "../Store/SongsStore/songs_state";
import classes from "./PlayButton.module.css";

interface ButtonProps {
 onClick?: () => void;
}

const PlayButton: React.FC<ButtonProps> = ({ onClick }) => {
 const isPaused = useSelector((state: SongState) => state.song.isPlaying);

 return (
  <div className={classes.button_wrapper}>
   <button
    className={`${classes.button} ${isPaused ? classes.paused : ""}`}
   ></button>
  </div>
 );
};

export default PlayButton;
