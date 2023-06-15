import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ApiCall from "../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import SimpleLoader from "../../../Components/Loaders/SimpleLoader/SimpleLoader";
import { RootState } from "../../../Store/UserStore/user_state";
import { ArtistActions } from "../../../Store/ArtistStore/artist_reducer";
import { IArtist, Release, Song } from "../types/IArtist";
import classes from "./Artist.module.css";
import { Outlet } from "react-router-dom";

function Artist() {
 const { artistId } = useParams<{ artistId: string }>();
 const [isLoading, setLoading] = useState<boolean>(true);
 const likedSongs = useSelector((state: RootState) => state.user.likedSongs);
 const dispatch = useDispatch();

 useEffect(() => {
  async function fetchArtist() {
   try {
    setLoading(true);

    const response = await ApiCall.get(ENDPOINTS.ARTIST.GET(artistId + ""));

    if (response.data.isSuccess) {
     const artist: IArtist = {
      ...response.data.result,
      releases: response.data.result.releases?.map((release: Release) => ({
       ...release,
       songs: release.songs.map((song: Song) => ({
        ...song,
        isLiked: likedSongs?.songs?.some(
         (lSong: any) => lSong?.songId === song.songId
        ),
        likedId:
         likedSongs?.songs
          ?.filter((item: any) => item.songId === song.songId)
          ?.pop()?.likedId || null,
       })),
      })),
     };
     dispatch(ArtistActions.SetArtist({ artist }));
    }
   } catch (error) {
    console.log(error);
   } finally {
    setLoading(false);
   }
  }

  if (artistId) {
   fetchArtist();
  }
 }, [artistId, likedSongs]);

 return (
  <div className={classes.main}>
   {isLoading && <SimpleLoader />}
   <Outlet />
  </div>
 );
}

export default Artist;
