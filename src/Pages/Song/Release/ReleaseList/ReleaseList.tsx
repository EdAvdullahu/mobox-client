import { ISong } from "../../types/ISong";
import classes from "./ReleaseList.module.css";
import ScrollElement from "../../../../Components/ScrollElement";
import { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { ReleaseState } from "@/Store/ReleaseStore/release_state";
import { Song } from "../../types/IArtist";
import ReleaseListItem from "../ReleaseListItem/ReleaseListItem";

function ReleaseList() {
 const songs = useSelector(
  (state: ReleaseState) => state.release.release?.songs
 );

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
    {songs?.map((item: Song, index: number) => (
     <ReleaseListItem key={index} song={item} order={index} />
    ))}
   </ScrollElement>
  </div>
 );
}

export default ReleaseList;
