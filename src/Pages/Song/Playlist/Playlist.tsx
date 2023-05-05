import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiCall from "../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import PlaylistList from "./PlaylistList/PlaylistList";
import { IPlaylist } from "../types/IPlaylist";
import classes from "./Playlist.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/UserStore/user_state";
import { ISong } from "../types/ISong";

function Playlist() {
 const { playlistId } = useParams<{ playlistId: string }>();
 const [playlist, setPlaylist] = useState<IPlaylist | undefined>(undefined);
 const likedSongs = useSelector((state: RootState) => state.user.likedSongs);

 const addLikeData = (playlist: IPlaylist): IPlaylist => {
  const playlistWithLikes = playlist.songs.map((item: ISong) => ({
   ...item,
   isLiked: likedSongs?.songs?.some(
    (lSong: any) => lSong?.songId === item.songId
   ),
  }));
  playlistWithLikes.forEach((element: ISong) => {
   if (element.isLiked) {
    likedSongs?.songs?.forEach((song: any) => {
     if (song.songId === element.songId) {
      element.likedId = song.likedId;
     }
    });
   }
  });
  console.log("playlist with likes", playlistWithLikes);
  return { ...playlist, songs: playlistWithLikes };
 };
 useEffect(() => {
  if (playlist) setPlaylist(addLikeData(playlist));
 }, [likedSongs]);
 useEffect(() => {
  const fetchPlaylist = async () => {
   try {
    if (playlistId) {
     const res = await ApiCall.getNoAuth(
      ENDPOINTS.PLAYLIST.ID(playlistId),
      null
     );
     const playlistWithLikes = addLikeData(res.data.result);
     setPlaylist(playlistWithLikes);
    }
   } catch (error) {
    console.error(error);
   }
  };
  if (playlistId) {
   fetchPlaylist();
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
   <div>
    {playlist?.songs && (
     <PlaylistList songs={playlist.songs} playlist={playlist} />
    )}
   </div>
  </div>
 );
}

export default Playlist;
