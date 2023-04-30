import PlayListListItem from "../PlaylistListItem/PlaylistListItem";
import { ISong } from "../../types/ISong";
import classes from "./PlaylistList.module.css";
import ScrollElement from "../../../../Components/ScrollElement";
import { CSSProperties } from "react";

function PlaylistList({ songs }: { songs: ISong[] }) {
 const innerContent: CSSProperties = {
  height: "calc(100% - 300px)",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
 };
 return (
  <div className={classes.main}>
   <div className={classes.table_header}>
    <div>#</div>
    <div>Songs</div>
    <div>Release</div>
    <div>Length</div>
    <div></div>
   </div>
   <ScrollElement divStyle={innerContent} shadow={"rgb(250 40 112 / 0.3)"}>
    {songs.map((item: ISong, index: number) => (
     <PlayListListItem key={index} song={item} order={index} />
    ))}
   </ScrollElement>
  </div>
 );
}

export default PlaylistList;
