import { useSelector } from "react-redux";
import { ISongLike } from "../../types/ILikedSong";
import { RootState } from "../../../../Store/UserStore/user_state";
import HeartNoFill from "../../../../Assets/Svg/HeartNoFill";
import classes from "./LikedSons.module.css";
import ClockWhite from "../../../../Assets/Svg/ClockWhite";
import ScrollElement from "../../../../Components/ScrollElement";
import LikedSongItem from "./LikedSongItem";
import { useState } from "react";

interface headers {
 name: any;
 width: number;
}

function LikedSong() {
 const likedSongs = useSelector((state: RootState) => state.user.likedSongs);
 const user = useSelector((state: RootState) => state.user);

 const [active, setActive] = useState<number | null>(null);
 const handleActive = (index: number) => {
  if (index === active) {
   setActive(null);
  } else {
   setActive(index);
  }
 };

 const Headers: headers[] = [
  { name: "#", width: 3 },
  { name: "Songs", width: 40 },
  { name: "Release", width: 20 },
  { name: "Date added", width: 15 },
  { name: <ClockWhite />, width: 8 },
  { name: "", width: 14 },
 ];

 function countLength(): string {
  let totalLengthInSeconds: number = 0;
  if (likedSongs?.songs) {
   for (let i = 0; i < Object.keys(likedSongs?.songs)?.length; i++) {
    let songLength = likedSongs?.songs[i].length;
    let lengthParts = songLength?.split(":");
    let lengthInSeconds =
     parseInt(lengthParts[0]) * 3600 +
     parseInt(lengthParts[1]) * 60 +
     parseInt(lengthParts[2]);
    totalLengthInSeconds += lengthInSeconds;
   }
   let hour: number = Math.floor(totalLengthInSeconds / 3600);
   let length: string =
    (hour === 0 ? "" : hour + hour === 1 ? "hour" : "hours") +
    Math.floor((totalLengthInSeconds % 3600) / 60) +
    "min " +
    ((totalLengthInSeconds % 3600) % 60) +
    "sec";
   return length;
  }
  return "";
 }
 return (
  <div className={classes.main}>
   <div className={classes.header}>
    <div className={classes.heart}>
     <HeartNoFill />
    </div>
    <div className={classes.info}>
     <div className={classes.private}>Private Playlist</div>
     <div className={classes.info_container}>
      <div className={classes.liked}>Liked Songs</div>
      <div className={classes.numbers}>
       <div className={classes.number}>
        {likedSongs &&
         likedSongs.songs.length +
          (likedSongs && likedSongs.songs.length > 1 ? " songs" : " song")}
       </div>
       <div>|</div>
       <div className={classes.duration}>{countLength()}</div>
      </div>
     </div>
    </div>
   </div>
   <div className={classes.list}>
    <div className={classes.table_header}>
     {Headers.map((item: headers, index: number) => (
      <div
       className={classes.header_item}
       style={{ width: item.width + "%" }}
       key={index}
      >
       {item.name}
      </div>
     ))}
    </div>
    <ScrollElement>
     {likedSongs?.songs?.map((item: ISongLike, index: number) => (
      <LikedSongItem
       onClick={() => handleActive(index + 1)}
       key={index}
       song={item}
       order={index + 1}
       active={active}
      />
     ))}
    </ScrollElement>
   </div>
  </div>
 );
}

export default LikedSong;
