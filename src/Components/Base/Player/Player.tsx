import { useState } from "react";
import ArrowPink from "../../../Assets/Svg/ArrowPink";
import Card from "../../Card/Card";
import classes from "./Player.module.css";

interface PlayerProps {
  title?: string;
  artist?: string;
  isLiked?: boolean;
}

const Player: React.FC<PlayerProps> = (props: PlayerProps) => {
  const [lyricsAreVisable, setLAV] = useState(false);
  function displayLyrics(): void {
    setLAV(!lyricsAreVisable);
  }
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
            <h3>{props.title}</h3>
            <p>{props.artist}</p>
            {props.isLiked}
          </div>
        </div>
        <div className={classes.control_wrapper}></div>
        <div className={classes.lyrics} onClick={displayLyrics}>
          <ArrowPink /> Lyrics
        </div>
      </div>
      <div className={classes.lyrics_wrapper}>
        <div>
          Lorem ipsum dolor sit amet consectetur. Sagittis sed scelerisque nulla
          adipiscing curabitur adipiscing a.
        </div>
        <div>Vulputate vel ut imperdiet amet lacus.</div>
        <div>
          Cursus id eget enim amet mauris vivamus morbi a praesent. Dui
          habitasse a interdum pharetra posuere tincidunt tristique odio. Lorem
          ipsum dolor sit amet consectetur.
        </div>
        <div>
          Sagittis sed scelerisque nulla adipiscing curabitur adipiscing a.
        </div>
      </div>
    </div>
  );
};

export default Player;
