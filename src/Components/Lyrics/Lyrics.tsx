import { useState } from "react";
import classes from "./Lyrics.module.css";
import ArrowPurple from "../../Assets/Svg/ArrowPurple";

interface LyricsProps {
  lyric: string;
  annotation?: string;
}

const Lyrics: React.FC<LyricsProps> = (props: LyricsProps) => {
  const [annotation, setAnnotation] = useState(false);

  const handleClick = () => {
    setAnnotation(!annotation);
  };
  return (
    <div className={classes.wrapper}>
      <ul className={classes.wrapper_item}>
        <li
          className={`${classes.lyric} ${annotation ? classes.active : ""}`}
          onClick={handleClick}
        >
          {props.lyric}
        </li>
        {annotation && (
          <li className={classes.annotation}>
            <div className={classes.arrow}>
              <ArrowPurple></ArrowPurple>
            </div>
            <div className={classes.annotation_text}>
              <h3>Lyrics Annotation</h3>
              {props.annotation}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Lyrics;
