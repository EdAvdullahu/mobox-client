import { SearchState } from "../../../../Store/Search/search_state";
import { useSelector } from "react-redux";
import classes from "./SearchResults.module.css";
import ScrollElement from "../../../../Components/ScrollElement";
import { Advanced, Artist, Feature, Release } from "../../types/ISearch";
import Card from "../../../../Components/Base/Card/Card";
import { NavLink } from "react-router-dom";
import Explicit from "../../../../Assets/Svg/Explicit";
import { formatDuration } from "../../../../Common/Services/comon.services";

type CSSProperties = {
 [key: string]: string | number;
};

const resultStyle: CSSProperties = {
 height: "calc(100vh - 120px)",
 display: "flex",
 flexDirection: "column",
 gap: "20px",
 overflow: "scroll",
 paddingBottom: "150px",
};

function SearchResults() {
 //store mappers
 const results = useSelector((state: SearchState) => state.search.searchResult);

 const artists = results?.artists
  ? results?.artists?.length > 6
    ? results.artists.slice(0, 6)
    : results.artists
  : [];
 const songs = results?.advanced
  ? results.advanced.length > 4
    ? results.advanced.slice(0, 4)
    : results.advanced
  : [];
 const releases = results?.releases
  ? results?.releases.length > 4
    ? results?.releases.slice(0, 4)
    : results?.releases
  : [];
 return (
  <div>
   <ScrollElement divStyle={resultStyle} shadow={"rgba(250, 40, 112, 0.678)"}>
    <div className={classes.main}>
     <div className={classes.result_wrapper}>
      <div className={classes.individual_result}>
       <Card>
        <div className={classes.innerCard}>
         <div> Artists</div>
         <hr />
         <div className={classes.artists}>
          {artists.length > 0 &&
           artists.map((item: Artist) => (
            <NavLink
             to={`/music/artist/${item.artistId}`}
             className={classes.artist}
            >
             <div key={item.artistId}>
              <img src={item.imageUrl} alt={item.name} />
              {item.name}
             </div>
            </NavLink>
           ))}
          {artists.length === 0 && (
           <div className={classes.nodata}>No Artists Found</div>
          )}
         </div>
        </div>
       </Card>
      </div>
      <div className={classes.individual_result}>
       <Card>
        <div className={classes.innerCard}>
         <div>Songs</div>
         <hr />
         <div className={classes.songs}>
          <table>
           {songs.length > 0 &&
            songs.map((item: Advanced) => (
             <tr key={item.artistId}>
              <td className={classes.advanced_img}>
               <div>
                <img src={item.song.imageUrl} alt={item.song.name} />
               </div>
              </td>
              <td className={classes.songs_info}>
               <div>
                <div>{item.song.name}</div>
                <div className={classes.features}>
                 {item.song.isExplicite && <Explicit />}
                 {item.song.features
                  .map((feature: Feature) => {
                   return feature.artist.name;
                  })
                  .join(", ")}
                </div>
               </div>
              </td>
              <td>{formatDuration(item.song.length)}</td>
             </tr>
            ))}
           {songs.length === 0 && (
            <div className={classes.nodata}>
             <p>No Songs Found</p>
            </div>
           )}
          </table>
         </div>
        </div>
       </Card>
      </div>
     </div>
     <div className={classes.result_wrapper}>
      <div className={classes.individual_result}>
       <Card>
        <div className={classes.innerCard}>
         <div>Releases</div>
         <hr />
         <div className={classes.releases}>
          {releases.length > 0 &&
           releases.map((item: Release) => (
            <NavLink
             to={`/music/release/${item.releaseId}`}
             className={classes.release}
            >
             <div key={item.artistId}>
              <img src={item.imageUrl} alt={item.title} />
              {item.title}
             </div>
            </NavLink>
           ))}
          {releases.length === 0 && (
           <div className={classes.nodata}>No Releases Found</div>
          )}
         </div>
        </div>
       </Card>
      </div>
     </div>
    </div>
   </ScrollElement>
  </div>
 );
}

export default SearchResults;
