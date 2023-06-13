import { useState } from "react";
import COOKIE from "../../../../../Common/Services/cookie.service";
import classes from "./NewRelease.module.css";
import Input from "../../Components/Inputs/Input/Input";
import Textarea from "../../Components/Inputs/Textare/Textarea";
import SongRelease from "./Song/SongRelease";
import { SongPostRequest } from "../../Types/NewRelease";
import ApiCall from "../../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../../Common/Api/ENDPOINTS";

interface Feature {
 songId: number;
 artistID: number;
 featureRole: number;
}

interface Tracker {
 status: string;
 name: string;
 message: string;
 index: number;
}

function NewRelease() {
 const artistName = COOKIE.getCookie("username") || "undefined";
 const artistId = COOKIE.getCookie("userId");

 // Tracking logic
 const [loading, setLoading] = useState(false);
 const [releaseC, setReleaseC] = useState("");
 const [trackers, setTrackers] = useState<Tracker[]>([]);
 const [indexing, setInd] = useState(0);

 // Input values for the release
 const [tittle, setTittle] = useState("");
 const [description, setDescription] = useState("");
 const [image, setImage] = useState<File | null>(null);
 const [nos, setNos] = useState(0);

 const tittleHandler = (e: string) => {
  setTittle(e);
 };

 // Release information
 const [songs, setSongs] = useState<SongPostRequest[]>([]);

 const addSong = () => {
  setNos(nos + 1);
  const newSong: SongPostRequest = {
   Name: "",
   Image: null,
   HasFeatures: false,
   ReleaseId: 0,
   IsExplicit: false,
   Audio: null,
   Features: [],
   Genres: [],
  };

  setSongs([...songs, newSong]);
 };

 const handleClick = async () => {
  if (artistId && image) {
   setLoading(true);
   setReleaseC("Creating");
   const trac: Tracker[] = songs.map((item: SongPostRequest, index: number) => {
    return {
     name: item.Name,
     status: "Not Started",
     message: "",
     index: index,
    };
   });
   setTrackers(trac);
   try {
    const formData = new FormData();
    formData.append("Title", tittle);
    formData.append("Description", description);
    formData.append("ArtistId", artistId);
    formData.append("Image", image);
    formData.append("NumnerOfSongs", nos + "");
    const releaseResponse = await ApiCall.postNoAuth(
     ENDPOINTS.SONGS.RELEASE.NEW(),
     formData
    );
    releaseResponse.data.isSuccess
     ? setReleaseC("Created Successfully")
     : setReleaseC("Creation Failed");
    if (releaseResponse.data.isSuccess) {
     for (const song of songs) {
      if (song.Audio && song.Image) {
       try {
        const tempIndex = trackers.findIndex((item: Tracker) => {
         return item.index === indexing;
        });
        if (trackers[tempIndex] && trackers[tempIndex].status) {
         trackers[tempIndex].status = "Creating";
        }
        setTrackers([...trackers]);
        const newSongData = new FormData();
        const baseFeature: Feature = {
         songId: 0,
         artistID: +artistId,
         featureRole: 0,
        };
        const songFeature: Feature[] = song.features
         ? [baseFeature, ...song.features]
         : [baseFeature];
        newSongData.append("Name", song.Name);
        newSongData.append("Image", song.Image);
        newSongData.append("HasFeatures", song.HasFeatures + "");
        newSongData.append("ReleaseId", releaseResponse.data.result.releaseId);
        newSongData.append("IsExplicite", song.IsExplicit + "");
        newSongData.append("Audio", song.Audio);
        newSongData.append("features", JSON.stringify(songFeature));
        newSongData.append("genres", JSON.stringify(song.genres));
        const res = await ApiCall.postNoAuth(
         ENDPOINTS.SONGS.SONG.NEW(),
         newSongData
        );
        if (trackers[tempIndex] && trackers[tempIndex].status) {
         trackers[tempIndex].status = res.data.isSuccess ? "Created" : "Failed";
         setTrackers([...trackers]);
         setInd(indexing + 1);
        }
       } catch (error) {
        console.error(error);
       }
      }
     }
    }
   } catch (error) {
    console.error(error);
   } finally {
    setLoading(false);
   }
  }
 };

 const handleSongChange = (index: number, e: SongPostRequest) => {
  const updatedSongs = [...songs];
  updatedSongs[index] = e;
  setSongs(updatedSongs);
 };

 return (
  <div className={classes.main}>
   {loading && (
    <div className={classes.tracking_screen}>
     <div className={classes.tracking_content}>
      <div className={classes.track}>
       <span>Release</span>
       <span>{releaseC}</span>
      </div>
      <div className={classes.divider_dark}></div>
      {trackers.map((item: Tracker) => (
       <div
        className={`${classes.track} ${
         item.status === "Creating" ? classes.progress : ""
        }`}
        key={item.index}
       >
        <span>{item.name}</span>
        <span>{item.status}</span>
       </div>
      ))}
     </div>
    </div>
   )}
   <div className={classes.input_group}>
    <Input
     value={tittle}
     type="text"
     handleChange={tittleHandler}
     isDisabled={false}
     forLbl="tittle"
     label="tittle"
    ></Input>
    <Input
     value={artistName}
     type="text"
     isDisabled={true}
     forLbl="artist"
     label="artist"
    ></Input>
   </div>
   <div className={classes.input_group}>
    <Textarea
     value={description}
     rows={2}
     handleChange={(e) => setDescription(e)}
     isDisabled={false}
     forLbl="desc"
     label="description"
    ></Textarea>
    <Input
     value={image}
     type="file"
     isDisabled={false}
     handleChange={(e) => setImage(e)}
     forLbl="image"
     label="image"
    ></Input>
   </div>
   <div className={classes.input_group}>
    <Input
     value={nos}
     type="number"
     isDisabled={true}
     forLbl="nos"
     label="number of songs"
    ></Input>
    <button className={classes.save} onClick={handleClick}>
     Save
    </button>
   </div>
   <div className={classes.divider}></div>
   <div className={classes.songs}>
    {songs.map((song: SongPostRequest, index: number) => (
     <SongRelease
      index={index}
      key={index}
      handleChange={(e) => handleSongChange(index, e)}
     />
    ))}
   </div>
   <div>
    <div onClick={addSong} className={classes.add_song}>
     <div className={classes.plus}>
      <span style={{ marginTop: "-4px" }}>+</span>
     </div>
     Add Song
    </div>
   </div>
  </div>
 );
}

export default NewRelease;
