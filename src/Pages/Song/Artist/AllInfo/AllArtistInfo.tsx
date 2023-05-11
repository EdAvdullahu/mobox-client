import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./ArtistInfo.module.css";
import BaseBackground from "../../../../Components/Base/BaseBackground";
import ScrollElement from "../../../../Components/ScrollElement";
import { ArtistState } from "../../../../Store/ArtistStore/artist_state";
import { Feature, Release, ReleaseType } from "../../types/IArtist";
import Card from "../../../../Components/Base/Card/Card";
import router from "../../../../Router/router";
import { NavLink } from "react-router-dom";

function AllArtistInfo() {
 const artist = useSelector((state: ArtistState) => state.artist.artist);
 const [disco, setDisco] = useState<Release[]>([]);
 const [selectedD, setSelectedD] = useState<ReleaseType>(ReleaseType.ALBUM);

 useEffect(() => {
  if (artist) {
   const releases = artist.releases ?? [];
   setDisco(releases.filter((r) => r.releaseType === selectedD));
  }
 }, [artist, selectedD]);

 const handleDiscoChange = (type: ReleaseType) => {
  setSelectedD(type);
 };

 const goTo = (id: number) => {
  router.navigate("/music/release/" + id);
 };

 const renderRelease = (release: Release, key: number) => (
  <div
   key={key}
   onClick={() => {
    goTo(release.releaseId);
   }}
  >
   <Card>
    <div className={classes.inner_card}>
     <img src={release.imageUrl} alt={release.title} />
     <div className={classes.inner_card_info}>{release.title}</div>
    </div>
   </Card>
  </div>
 );
 const renderFeatures = () => {
  return (
   <div className={classes.release_wapper}>
    <div className={classes.discography}>
     <div className={classes.disco}>Featured in</div>
    </div>
    <div className={classes.releases}>
     {artist?.features?.map((item: any, key: number) => (
      <div key={key}>
       <Card>
        <div className={classes.inner_card}>
         <img src={item?.imageUrl} alt={item?.name} />
         <div className={classes.inner_card_info}>{item.name}</div>
         <div className={classes.inner_card_features}>
          {item.features?.map((item: any, index: number) => (
           <NavLink key={index} to={`/music/artist/${item.artistId}`}>
            <div>{item.name}</div>
           </NavLink>
          ))}
         </div>
        </div>
       </Card>
      </div>
     ))}
    </div>
   </div>
  );
 };

 const renderDiscography = () => (
  <div className={classes.release_wapper}>
   <div className={classes.discography}>
    <div className={classes.disco}>
     Discography <div className={classes.disco_border}></div>
    </div>
    <div className={classes.discography_select}>
     <span
      onClick={() => handleDiscoChange(ReleaseType.ALBUM)}
      className={`${selectedD === ReleaseType.ALBUM ? classes.selected : ""}`}
     >
      Albums
     </span>
     <span
      onClick={() => handleDiscoChange(ReleaseType.EP)}
      className={`${selectedD === ReleaseType.EP ? classes.selected : ""}`}
     >
      EPs
     </span>
     <span
      onClick={() => handleDiscoChange(ReleaseType.SINGLE)}
      className={`${selectedD === ReleaseType.SINGLE ? classes.selected : ""}`}
     >
      Singles
     </span>
    </div>
   </div>
   <div className={classes.releases}>{disco.map(renderRelease)}</div>
  </div>
 );

 const renderArtistInfo = () => (
  <div className={classes.main}>
   <div className={classes.header}>
    <div className={classes.name}>{artist?.name}</div>
    <div className={classes.backdrop}>
     <BaseBackground></BaseBackground>
    </div>
    <img src={artist?.imgUrl} alt={artist?.name} />
   </div>
   <div className={classes.body}>
    <>
     {renderDiscography()}
     {renderFeatures()}
    </>
   </div>
  </div>
 );

 const scrollStyle = {
  height: "calc(100vh - 200px)",
  overflow: "auto",
  display: "flex",
  justifyContent: "center",
 };

 return (
  <ScrollElement divStyle={scrollStyle} shadow={"rgb(0 0 0 / 0.5)"}>
   {renderArtistInfo()}
  </ScrollElement>
 );
}

export default AllArtistInfo;
