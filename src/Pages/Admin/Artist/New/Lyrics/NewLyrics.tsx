import { useState, useEffect } from "react";
import ApiCall from "../../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../../Common/Api/ENDPOINTS";
import COOKIE from "../../../../../Common/Services/cookie.service";
import classes from "./NewLyrics.module.css";
import LyricsInput from "./LyricsInput/LyricsInput";
interface release {
 id: number;
 name: string;
}
interface songs {
 id: number;
 name: string;
 playlistId: number;
}
const NewLyrics = () => {
 const [releases, setReleases] = useState<release[]>([]);
 const [releaseId, setReleaseId] = useState<number | null>();
 const [songs, setSongs] = useState<songs[]>([]);
 const [selectedSongs, setSelectedSongs] = useState<songs[]>([]);
 const [lyicsE, setLyricsE] = useState<boolean>(false);
 const [songId, setSongId] = useState<number>();
 const artistID = COOKIE.getCookie("userId");
 const getReleases = async () => {
  if (releases.length === 0 && artistID) {
   try {
    const res = await ApiCall.get(ENDPOINTS.ARTIST.GET(artistID));
    if (res.data?.isSuccess) {
     const mapped = res.data.result?.releases?.map((item: any) => {
      return {
       id: item?.releaseId,
       name: item?.title,
      };
     });
     const mappedSongs: songs[] = [];

     res.data.result.releases.forEach((release: any) => {
      release.songs.forEach((song: any) => {
       const temp = {
        id: song.songId,
        name: song.name,
        playlistId: release.releaseId,
       };

       mappedSongs.push(temp);
      });
     });
     setReleases(mapped);
     setSongs(mappedSongs);
    }
   } catch (error) {
    console.error(error);
   }
  }
 };

 useEffect(() => {
  getReleases();
 });
 useEffect(() => {
  const filtered = songs.filter((item: songs) => {
   return item.playlistId === releaseId;
  });
  setSelectedSongs(filtered);
 }, [releaseId]);

 const handleChangeRelease = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedReleaseId = parseInt(event.target.value);
  setReleaseId(selectedReleaseId);
 };
 const handleChangeSong = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedId = parseInt(event.target.value);
  setSongId(selectedId);
 };

 const getLyrics = async () => {
  try {
   if (songId) {
    const res = await ApiCall.get(ENDPOINTS.SONGS.LYRICS.GET(songId + ""));
    if (res.data.result) {
     setLyricsE(true);
    } else {
     setLyricsE(false);
    }
   }
  } catch (error) {
   console.error(error);
  }
 };
 useEffect(() => {
  getLyrics();
 }, [songId]);

 return (
  <div className={classes.main}>
   <div className={classes.input_wrapper}>
    <div className={classes.outer}>
     <label htmlFor="release">Release</label>
     <select
      className={classes.select}
      id="release"
      name="release"
      onChange={handleChangeRelease}
     >
      <option disabled selected value="">
       Select a release
      </option>
      {releases?.map((item: release) => (
       <option key={item.id} value={item.id}>
        {item.name}
       </option>
      ))}
     </select>
    </div>
    <div className={classes.outer}>
     <label htmlFor="song">Song</label>
     <select
      className={classes.select}
      disabled={!releaseId}
      id="song"
      onChange={handleChangeSong}
     >
      <option disabled selected value="">
       Select a Song
      </option>
      {selectedSongs?.map((item: release) => (
       <option key={item.id} value={item.id}>
        {item.name}
       </option>
      ))}
     </select>
    </div>
   </div>
   <div className={classes.content}>
    <div className={classes.noSelect}>
     {!releaseId && <div>Select Release</div>}
    </div>
    <div className={classes.noSelect}>
     {!songId && releaseId && <div>Select Song</div>}
    </div>
    <div className={classes.noSelect}>
     {lyicsE && <div>Song already has lyrics</div>}
    </div>
    <div className={classes.lyrics}>
     {!lyicsE && releaseId && songId && (
      <LyricsInput
       songId={songId}
       songName={
        songs.find((item: songs) => {
         return item.id === songId;
        })?.name
       }
      />
     )}
    </div>
   </div>
  </div>
 );
};

export default NewLyrics;
