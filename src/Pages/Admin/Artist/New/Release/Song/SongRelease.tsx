import React, { useEffect, useState } from "react";
import Input from "../../../Components/Inputs/Input/Input";
import { SongPostRequest } from "../../../Types/NewRelease";
import { Genre } from "../../../../../../Store/SongsStore/songs_actions";
import { useDispatch, useSelector } from "react-redux";
import { SongState } from "../../../../../../Store/SongsStore/songs_state";
import CustomMulitiselect from "../../../Components/Inputs/Multiselect/CustomMultiselect";
import ApiCall from "../../../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../../../Common/Api/ENDPOINTS";
import { SongActions } from "../../../../../../Store/SongsStore/songs_reduces";
import classes from "./SongRelease.module.css";
import Features from "../../../Components/Inputs/Features/Features";
interface SongInputProps {
 index: number;
 handleChange: (value: any) => void;
}
interface feature {
 songId: 0;
 artistID: number;
 featureRole: 1;
}
interface genre {
 songId: number;
 genreId: number;
}
const SongRelease: React.FC<SongInputProps> = ({ index, handleChange }) => {
 const [title, setTitle] = useState<string>("");
 const [image, setImage] = useState<File | null>();
 const [audio, setAudio] = useState<File | null>();
 const [expl, setExp] = useState<boolean>(false);
 const [features, setFeatures] = useState<feature[]>([]);
 const [genres, setGenres] = useState([]);
 const dispatch = useDispatch();

 const gnereState = useSelector((state: SongState) => state.song.genres);
 useEffect(() => {
  if (!gnereState) {
   ApiCall.getNoAuth(ENDPOINTS.SONGS.GENRE.GET(), null).then((res) => {
    if (res.data.result) {
     dispatch(SongActions.SetGenres({ genres: res.data.result }));
    }
   });
  }
 }, [gnereState]);
 const optionGenres = gnereState?.map((item: Genre) => ({
  value: item.genreId,
  label: item.name,
 }));

 const handleTitle = (value: any) => {
  setTitle(value);
 };
 const handleImage = (value: any) => {
  setImage(value);
 };
 const handleAudio = (value: any) => {
  setAudio(value);
 };
 const handleFeatures = (value: feature[]) => {
  setFeatures(value);
 };

 useEffect(() => {
  const Song: SongPostRequest = {
   Image: image ? image : null,
   Audio: audio ? audio : null,
   Features: [],
   Genres: [],
   IsExplicit: expl,
   ReleaseId: 0,
   HasFeatures: features.length > 1,
   Name: title,
   features: features,
   genres: genres.map((item: any) => {
    return {
     songId: 0,
     genreId: item?.value,
    };
   }),
  };
  handleChange(Song);
 }, [image, audio, expl, features, title, genres]);
 return (
  <div className={classes.wrapper}>
   <div>Song{" " + (+index + 1)}</div>
   <div className={classes.input_group}>
    <Input
     type="text"
     value={title}
     handleChange={(e) => handleTitle(e)}
     isDisabled={false}
     forLbl={`songName${index}`}
     label={`Name`}
    />
    <Input
     type="file"
     value={image}
     handleChange={(e) => handleImage(e)}
     isDisabled={false}
     forLbl={`songImage${index}`}
     label={`Image`}
    />
   </div>
   <div className={classes.input_group}>
    <Input
     type="file"
     value={audio}
     handleChange={(e) => handleAudio(e)}
     isDisabled={false}
     forLbl={`songAudio${index}`}
     label={`Audio`}
    />
    {optionGenres && (
     <CustomMulitiselect
      options={optionGenres}
      value={genres}
      handleChange={setGenres}
      label="Genres"
      forLbl={"songGenre" + index}
     ></CustomMulitiselect>
    )}
   </div>
   <div className={classes.input_group}>
    <Features handleChange={(e) => handleFeatures(e)} index={index}></Features>
   </div>
  </div>
 );
};

export default SongRelease;
