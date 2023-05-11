import { useSelector } from "react-redux";
import classes from "./ArtistInfo.module.css";
import { ArtistState } from "../../../../Store/ArtistStore/artist_state";
import Card from "../../../../Components/Base/Card/Card";
import { Release, Song } from "../../types/IArtist";
import { NavLink } from "react-router-dom";

function ArtistInfo() {
 const artist = useSelector((state: ArtistState) => state.artist.artist);
 return (
  <div className={classes.main}>
   <div className={classes.img}>
    <img src={artist?.imgUrl} alt={artist?.name} />
   </div>
   <div className={classes.list}>
    <Card>
     <div className={classes.list_inner}>
      <NavLink to={`/music/artist/${artist?.artistId}/view-all`}>
       See all
      </NavLink>
      {artist?.releases.map((release: Release, index: number) => (
       <div key={index}>
        {release.songs.map((song: Song, key: number) => (
         <div key={key}>{song.name}</div>
        ))}
       </div>
      ))}
     </div>
    </Card>
   </div>
   <div className={classes.similar}></div>
   <div className={classes.info}></div>
  </div>
 );
}
export default ArtistInfo;
