import ApiCall from "../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArtistActions } from "../../../Store/ArtistStore/artist_reducer";
import classes from "./Artist.module.css";
import { IArtist } from "../types/IArtist";
import { RootState } from "../../../Store/UserStore/user_state";

function Artist() {
 const { artistId } = useParams<{ artistId: string }>();
 const likedSongs = useSelector((state: RootState) => state.user.likedSongs);
 const dispatch = useDispatch();
 useEffect(() => {
  if (artistId) {
   ApiCall.getNoAuth(ENDPOINTS.SONG_API.ARTIST(artistId), null).then((res) => {
    if (res.data.isSuccess) {
     const Artist: IArtist = {
      ...res.data.result,
     };
     dispatch(ArtistActions.SetArtist({ artist: Artist }));
    }
   });
  }
 }, [artistId]);

 return (
  <div className={classes.main}>
   <Outlet />
  </div>
 );
}

export default Artist;
