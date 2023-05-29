import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Release, Song } from "../types/IArtist";
import { ReleaseActions } from "../../../Store/ReleaseStore/release_reducer";
import ApiCall from "../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import { RootState } from "../../../Store/UserStore/user_state";
import { ArtistState } from "../../../Store/ArtistStore/artist_state";
import classes from "./Release.module.css";
import { ReleaseState } from "../../../Store/ReleaseStore/release_state";
import HeartNoFill from "../../../Assets/Svg/HeartNoFill";
import ReleaseList from "./ReleaseList/ReleaseList";

function ReleaseBase() {
 const { releaseId } = useParams<{ releaseId: string }>();
 const artist = useSelector((state: ArtistState) => state.artist.artist);
 const likedSongs = useSelector((state: RootState) => state.user.likedSongs);
 const releaseState = useSelector(
  (state: ReleaseState) => state.release.release
 );
 const dispatch = useDispatch();

 useEffect(() => {
  const fetchRelease = async () => {
   if (releaseId) {
    const release = artist?.releases?.find(
     (release: Release) => release.releaseId === +releaseId
    );

    if (release) {
     dispatch(ReleaseActions.SetRelease({ release }));
    } else {
     const res = await ApiCall.getNoAuth(
      ENDPOINTS.SONGS.RELEASE.GET(+releaseId),
      null
     );

     if (res.data.isSuccess) {
      const disRelease = {
       release: {
        ...res.data.result,
        songs: res.data.result?.songs.map((song: Song) => ({
         ...song,
         isLiked: likedSongs?.songs?.some(
          (lSong: any) => lSong?.songId === song.songId
         ),
         likedId:
          likedSongs?.songs?.find((item: any) => item.songId === song.songId)
           ?.likedId || null,
        })),
       },
      };

      dispatch(ReleaseActions.SetRelease(disRelease));
     }
    }
   }
  };

  fetchRelease();
 }, [releaseId, artist, likedSongs, dispatch]);

 return (
  <div className={classes.main}>
   <div className={classes.header}>
    <div className={classes.release_img}>
     <img src={releaseState?.imageUrl} alt={releaseState?.title} />
    </div>
    <div className={classes.header_info}>
     <div className={classes.tittle}>{releaseState?.title}</div>
     <div className={classes.description}>{releaseState?.description}</div>
     <div className={classes.likes}>20,213 likes</div>
     <div className={classes.actions}>
      <button className={classes.playnow}>Play now</button>
      <HeartNoFill />
      <div>share</div>
     </div>
    </div>
   </div>
   <div>
    <ReleaseList />
   </div>
  </div>
 );
}

export default ReleaseBase;
