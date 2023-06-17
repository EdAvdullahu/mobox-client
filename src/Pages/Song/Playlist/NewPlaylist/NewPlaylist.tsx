import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Store/UserStore/user_state";
import ApiCall from "../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../Common/Api/ENDPOINTS";
import { UserActions } from "../../../../Store/UserStore/user_reducer";
import Switch from "../../../../Components/Inputs/Switch/Switch";
import classes from "./NewPlaylist.module.css";
import SimpleLoader from "../../../../Components/Loaders/SimpleLoader/SimpleLoader";

interface PlaylistProps {
 handleToggle: () => void;
}

interface newPlaylist {
 tittle: string;
 description: string;
 isPublic: boolean;
 ownerId: number;
}

const NewPlaylist: React.FC<PlaylistProps> = ({ handleToggle }) => {
 const [isPrivate, setIsPrivate] = useState(false);
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [isLoading, setLoading] = useState(false);
 const user = useSelector((state: RootState) => state.user.user);
 const dispatch = useDispatch();

 const closePortal = () => {
  handleToggle();
 };

 const handleSave = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
 ) => {
  setLoading(true);
  e.preventDefault();
  if (user) {
   const playlist: newPlaylist = {
    isPublic: !isPrivate,
    tittle: title,
    description: description,
    ownerId: +user.id,
   };

   try {
    const res = await ApiCall.post(
     ENDPOINTS.USER.SONGS.PLAYLISTS.NEW(),
     playlist
    );
    if (res.data.isSuccess) {
     dispatch(UserActions.addPlaylist({ playlist: res.data.result }));
    }
   } catch (error) {
    console.error("Failed to create playlist:", error);
   } finally {
    setLoading(false);
    closePortal();
   }
  }
 };

 return (
  <div className={classes.main}>
   {isLoading && <SimpleLoader />}
   <div className={classes.body}>
    <fieldset className={classes.wrapper} name="play">
     <legend>New Playlist</legend>
     <button onClick={closePortal} className={classes.exit}>
      X
     </button>
     <form>
      <input
       type="text"
       placeholder="title"
       value={title}
       className={classes.input}
       onChange={(e) => setTitle(e.target.value)}
      />
      <input
       type="text"
       placeholder="description"
       className={classes.input}
       value={description}
       onChange={(e) => setDescription(e.target.value)}
      />
      <div className={classes.toggle}>
       <span className={!isPrivate ? classes.toggle_active : ""}>public</span>
       <Switch
        isOn={isPrivate}
        htmlFor={"private"}
        onColor="#EF476F"
        handleToggle={() => setIsPrivate(!isPrivate)}
       />
       <span className={isPrivate ? classes.toggle_active : ""}>private</span>
      </div>
      <button className={classes.submit} onClick={(e) => handleSave(e)}>
       Save
      </button>
     </form>
    </fieldset>
   </div>
  </div>
 );
};

export default NewPlaylist;
