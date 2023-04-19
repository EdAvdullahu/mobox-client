import { useState } from "react";
import ArrowPink from "../../../Assets/Svg/ArrowPink";
import Card from "../../Card/Card";
import classes from "./Player.module.css";
import Lyrics from "../../Lyrics/Lyrics";

interface PlayerProps {
  title?: string;
  artist?: string;
  isLiked?: boolean;
}

const Player: React.FC<PlayerProps> = (props: PlayerProps) => {
  const [lyricsAreVisable, setLAV] = useState(false); // state variable to keep track of lyrics visibility
  const [lyricsAv, setLAv] = useState(false); // state variable to keep track of the availability of lyrics

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
      lyric:
        "Sagittis sed scelerisque nulla adipiscing curabitur adipiscing a.",
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
      lyric:
        "Sagittis sed scelerisque nulla adipiscing curabitur adipiscing a.",
      annotation:
        "Sagittis sed scelerisque nulla adipiscing curabitur adipiscing a.",
    },
  ];
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
        <div className={classes.lyrics_wrapper}>
          {tempLyrics.map((item, index) => (
            <Lyrics
              key={index}
              lyric={item.lyric}
              annotation={item.annotation}
            ></Lyrics>
          ))}
        </div>
      )}
    </div>
  );
};

export default Player;
