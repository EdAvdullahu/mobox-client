import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ApiCall from "../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import PlaylistList from "./PlaylistList/PlaylistList";
import { IPlaylist } from "../types/IPlaylist";
import classes from "./Playlist.module.css";

import { ParallaxProvider, useParallax } from "react-scroll-parallax";
import { Parallax } from "react-scroll-parallax";

function Playlist() {
 const { playlistId } = useParams<{ playlistId: string }>();
 const [playlist, setPlaylist] = useState<IPlaylist | undefined>(undefined);

 useEffect(() => {
  if (playlistId) {
   ApiCall.getNoAuth(ENDPOINTS.PLAYLIST.ID(playlistId), null).then((res) => {
    setPlaylist(res.data.result);
   });
  }
 }, [playlistId]);

 return (
  <div className={classes.main}>
   <div className={classes.header}>
    <div className={classes.img}>
     <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
       <mask id="photo-mask">
        <path
         d="M 0, 89 C 0, 5.340000000000005 5.340000000000005, 0 89, 0 S 178, 5.340000000000005 178, 89 172.66, 178 89, 178 0, 172.66 0, 89"
         fill="#FFFFFF"
         transform="rotate(
                0,
                100,
                100
            ) translate(
                25
                25
            )"
        ></path>
       </mask>
      </defs>
      <image
       href="https://static.vecteezy.com/system/resources/previews/001/872/639/large_2x/dark-pink-blue-abstract-blurred-background-vector.jpg"
       mask="url(#photo-mask)"
      />
     </svg>
    </div>
    <div>
     <div>{playlist?.isPublic ? "Public " : "Private "} Playlist</div>
     <div>
      <div>{playlist?.title}</div>
      <div>{playlist?.description}</div>
      <div>20,213 likes</div>
     </div>
    </div>
   </div>
   <div>{playlist?.songs && <PlaylistList songs={playlist.songs} />}</div>
  </div>
 );
}

export default Playlist;
