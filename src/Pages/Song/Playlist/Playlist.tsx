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
import Collabs from "../../../Assets/Svg/Collabs";
import Portal from "../../../Components/Portal/Portal";
import PlaylistCollaborators from "./Collaborators/PlaylistCollaborators";
import Share from "../../../Assets/Svg/Share";
import { toast } from "../../../Components/Toast/ToastManager";

function Playlist() {
 const { playlistId } = useParams<{ playlistId: string }>();
 const [playlist, setPlaylist] = useState<IPlaylist | undefined>(undefined);
 const likedSongs = useSelector((state: RootState) => state.user.likedSongs);

 // add like data if song is in liked playlist
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
      ENDPOINTS.USER.SONGS.PLAYLISTS.GET(playlistId),
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

 const [editCollabs, setEditCollabs] = useState(false);
 const handleToggle = () => {
  setEditCollabs(!editCollabs);
 };

 // copy url to clipboard
 const handleCopyClick = () => {
  const currentURL = window.location.href;
  navigator.clipboard
   .writeText(currentURL)
   .then(() => {
    toast.show({
     id: "",
     title: "Success",
     content: "Link copied to clipboard",
     duration: 3000,
    });
    // toast.destroy(id);
   })
   .catch((error) => {
    console.error("Failed to copy URL to clipboard:", error);
   });
 };

 return (
  <div className={classes.main}>
   <div className={classes.header}>
    <div className={classes.release_img}>
     <img src="" alt="" />
    </div>
    <div className={classes.header_info}>
     <div>{playlist?.isPublic ? "Public " : "Private "} Playlist</div>
     <div>
      <div className={classes.tittle}>{playlist?.title}</div>
      <div className={classes.description}>{playlist?.description}</div>
      <div className={classes.likes}>20,213 likes</div>
     </div>
     <div className={classes.actions}>
      <button className={classes.playnow}>Play now</button>
      <div onClick={handleCopyClick}>
       <Share />
      </div>
      <div onClick={handleToggle}>
       <Collabs />
      </div>
      {editCollabs && (
       <Portal>
        <PlaylistCollaborators
         handleToggle={handleToggle}
         playlist={playlist}
        ></PlaylistCollaborators>
       </Portal>
      )}
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
