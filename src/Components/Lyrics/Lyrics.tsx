import classes from "./Lyrics.module.css";
import ArrowPurple from "../../Assets/Svg/ArrowPurple";

interface LyricsProps {
 lyric: string;
 annotation?: string;
}
const Lyrics: React.FC<
 LyricsProps & { isActive: boolean; onClick: () => void }
> = (props) => {
 return (
  <div className={classes.wrapper}>
   <ul className={classes.wrapper_item}>
    <li
     className={`${classes.lyric} ${props.isActive ? classes.active : ""}`}
     onClick={props.onClick}
     style={{
      cursor: props.isActive ? "default" : "pointer",
     }}
    >
     <div
      className={classes.inner_lyric}
      dangerouslySetInnerHTML={{ __html: props.lyric }}
     ></div>
    </li>
    {props.isActive &&
     props.annotation &&
     props.annotation.replace(/"/g, "").length > 0 && (
      <li className={classes.annotation}>
       <div className={classes.arrow}>
        <ArrowPurple></ArrowPurple>
       </div>
       <div className={classes.annotation_text}>
        <h3>Lyrics Annotation</h3>
        <div
         dangerouslySetInnerHTML={{
          __html: props.annotation.replace(/"/g, ""),
         }}
        ></div>
       </div>
      </li>
     )}
   </ul>
  </div>
 );
};

export default Lyrics;
