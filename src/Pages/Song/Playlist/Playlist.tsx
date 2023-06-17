import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiCall from "../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import PlaylistList from "./PlaylistList/PlaylistList";
import { IPlaylist, permissions } from "../types/IPlaylist";
import classes from "./Playlist.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store/UserStore/user_state";
import { ISong } from "../types/ISong";
import Collabs from "../../../Assets/Svg/Collabs";
import Portal from "../../../Components/Portal/Portal";
import PlaylistCollaborators from "./Collaborators/PlaylistCollaborators";
import Share from "../../../Assets/Svg/Share";
import { toast } from "react-toastify";
import COOKIE from "../../../Common/Services/cookie.service";
import Delete from "../../../Assets/Svg/Delete";
import { UserActions } from "../../../Store/UserStore/user_reducer";
import router from "../../../Router/router";
import Recommend from "../../../Assets/Svg/Recommend";
import ScrollElement from "../../../Components/ScrollElement";
import HeartFill from "../../../Assets/Svg/HeartFill";
import HeartNoFill from "../../../Assets/Svg/HeartNoFill";

type CSSProperties = {
 [key: string]: string | number;
};

const resultStyle: CSSProperties = {
 height: "calc(100vh - 300px)",
 display: "flex",
 flexDirection: "column",
 gap: "20px",
 overflow: "scroll",
};
function Playlist() {
 const { playlistId } = useParams<{ playlistId: string }>();
 const [playlist, setPlaylist] = useState<IPlaylist | undefined>(undefined);
 const userId = COOKIE.getCookie("userId");
 const likedSongs = useSelector((state: RootState) => state.user.likedSongs);
 const [perm, setPerm] = useState<permissions | undefined>(undefined);
 const [recommend, setRecommend] = useState<IPlaylist | undefined>(undefined);
 const dispatch = useDispatch();
 const userLikedPlaylists = useSelector(
  (state: RootState) => state.user.likedPlaylists
 );
 const [playlistLIke, setPlaylistLike] = useState<boolean>(false);

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
     const res = await ApiCall.get(
      ENDPOINTS.USER.SONGS.PLAYLISTS.GET(playlistId)
     );
     if (res.data.isSuccess && userId) {
      const permsissions = await ApiCall.get(
       ENDPOINTS.USER.SONGS.PLAYLISTS.GET_PERMISSIONS(+userId, playlistId)
      );
      if (permsissions.data.isSuccess) {
       const permi: permissions = {
        canAdd: permsissions.data.result.canAdd,
        canDelete: permsissions.data.result.canDelete,
       };
       setPerm(permi);
      }
     }
     const playlistWithLikes = addLikeData(res.data.result);
     setPlaylist(playlistWithLikes);
     if (Array.isArray(userLikedPlaylists)) {
      const isLiked = userLikedPlaylists.find((item: any) => {
       return item?.playlistId === playlistId;
      });
      setPlaylistLike(isLiked);
     }
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
    toast.success("Link copied to clipboard", {
     position: "top-center",
     autoClose: 2000,
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "dark",
    });
    // toast.destroy(id);
   })
   .catch((error) => {
    toast.error(error, {
     position: "top-center",
     autoClose: 2000,
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "dark",
    });
   });
 };

 const handleRemoveFromPlaylist = (songP: number) => {
  console.log("CALLED AT THE TOP", songP);
  const updatedPlaylist = playlist?.songs.filter((item: ISong) => {
   return item.songPlaylistId !== songP;
  });
  if (updatedPlaylist) {
   if (playlist?.playlistId)
    setPlaylist({ ...playlist, songs: updatedPlaylist });
  }
 };

 const [deletionInProgress, setDeletionInProgress] = useState(false);
 const handlePlaylistDelete = async () => {
  if (deletionInProgress) {
   return;
  }
  setDeletionInProgress(true);
  if (playlist?.playlistId && userId) {
   try {
    const res = await ApiCall.delete(
     ENDPOINTS.USER.SONGS.PLAYLISTS.DELETE(+userId, playlist.playlistId),
     null
    );
    if (res.data.result) {
     toast.success("Playlist deleted successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
     });
     dispatch(UserActions.removePlaylist(playlist.playlistId));
     router.navigate("/music");
    } else {
     toast.error(res.data.displayMessage, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
     });
    }
   } catch (error) {
    toast.error("Something went wrong", {
     position: "top-center",
     autoClose: 2000,
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "dark",
    });
   } finally {
    setDeletionInProgress(false);
   }
  }
 };

 const handleRecommend = async () => {
  try {
   if (playlist?.playlistId) {
    const res = await ApiCall.get(
     ENDPOINTS.USER.SONGS.PLAYLISTS.RECOMMEND(playlist?.playlistId)
    );
    if (res.data.isSuccess) {
     const tempP: IPlaylist = {
      playlistId: "",
      isPublic: false,
      title: "Recommendations",
      ownerId: 0,
      description: "",
      songs: res.data.result,
     };
     const playlistWithLikes = addLikeData(tempP);
     setRecommend(playlistWithLikes);
    }
   }
  } catch (error) {
   //do something
  }
 };

 const likePlaylist = async () => {
  try {
   if (playlistId && userId) {
    const res = await ApiCall.post(ENDPOINTS.USER.SONGS.PLAYLISTS.LIKE(), {
     userId: userId,
     playlistId: playlistId,
    });
    console.log("LIKE", res.data.result);
    if (res.data.result) {
     dispatch(UserActions.resetLikedPlaylist(res.data.result));
    }
   }
  } catch (error) {
   // do something
  }
 };
 const unlikePlaylist = async () => {
  if (playlistLIke && Array.isArray(userLikedPlaylists)) {
   try {
    const id = userLikedPlaylists.find((item: any) => {
     return item.playlistId === playlistId;
    })?.id;
    console.log("ID", id);
    if (id) {
     const res = await ApiCall.delete(
      ENDPOINTS.USER.SONGS.PLAYLISTS.DISLIKE(id),
      null
     );
     if (res.data.isSuccess) {
      dispatch(UserActions.removeLikedPlaylist(id));
     }
    }
   } catch (error) {
    // do something
   }
  }
 };
 useEffect(() => {
  if (Array.isArray(userLikedPlaylists)) {
   const isLiked = userLikedPlaylists.find((item: any) => {
    return item.playlistId === playlistId;
   });
   setPlaylistLike(isLiked);
  }
 }, [userLikedPlaylists]);

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
      {playlist?.likeCount && (
       <div className={classes.likes}>
        {playlist?.likeCount + (playlist?.likeCount > 1 ? " likes" : " like")}
       </div>
      )}
     </div>
     <div className={classes.actions}>
      <button className={classes.playnow}>Play now</button>
      <div onClick={handleCopyClick}>
       <Share />
      </div>
      {userId && playlist?.ownerId && +userId !== playlist.ownerId && (
       <div className={classes.likebtn}>
        {playlistLIke && (
         <div onClick={unlikePlaylist}>
          <HeartFill />
         </div>
        )}{" "}
        {!playlistLIke && (
         <div onClick={likePlaylist}>
          <HeartNoFill />
         </div>
        )}
       </div>
      )}
      {userId && playlist?.ownerId && +userId === playlist?.ownerId && (
       <div onClick={handleToggle}>
        <Collabs />
       </div>
      )}
      <div className={classes.recommend} onClick={handleRecommend}>
       <Recommend />
      </div>
      {playlist?.ownerId && userId && playlist?.ownerId == +userId && (
       <div onClick={handlePlaylistDelete} className={classes.delete}>
        <Delete />
       </div>
      )}
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
    <ScrollElement divStyle={resultStyle} shadow={"rgba(100, 131, 243, 0.925)"}>
     <div className={classes.list_holder}>
      {playlist?.songs && (
       <PlaylistList
        songs={playlist.songs}
        playlist={playlist}
        permissions={perm}
        handleRemove={(e) => handleRemoveFromPlaylist(e)}
       />
      )}
      {recommend?.songs && (
       <div className={classes.recommended}>
        <div>Recommended songs</div>
        <PlaylistList songs={recommend.songs} playlist={recommend} />
       </div>
      )}
     </div>
    </ScrollElement>
   </div>
  </div>
 );
}

export default Playlist;
