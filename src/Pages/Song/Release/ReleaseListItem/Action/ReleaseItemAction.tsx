import classes from "./ReleaseItemAction.module.css";
import DropDown from "../../../../../Components/Inputs/Dropdown/DropDown";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Song } from "../../../types/IArtist";
import { RootState } from "../../../../../Store/UserStore/user_state";
import ApiCall from "../../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../../Common/Api/ENDPOINTS";
interface prop {
 song: Song;
}
function ReleaseItemAction(props: prop) {
 const user = useSelector((state: RootState) => state.user);
 const [showDropDown, setShowDropDown] = useState<boolean>(false);
 const toggleDropDown = () => {
  setShowDropDown(!showDropDown);
 };
 const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
  if (event.currentTarget === event.target) {
   setShowDropDown(false);
  }
 };

 const addSongToPlaylist = async (id: string) => {
  console.log(id);
  const newPlaylist = {
   songId: +props.song.songId,
   playlistId: id + "",
  };
  try {
   const res = await ApiCall.postNoAuth(
    ENDPOINTS.USER.SONGS.PLAYLISTS.ADD_SONG(),
    newPlaylist
   );
   console.log("DATA", res.data);
   if (res.data.isSuccess) {
    console.log("NICE JOB");
   }
  } catch (error) {
   console.error("Failed to add to playlist:", error);
  }
 };
 return (
  <div className={classes.main}>
   <button
    className={classes.button}
    onClick={(): void => toggleDropDown()}
    onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
   >
    <div className={classes.dots}>...</div>
    {showDropDown && (
     <DropDown
      showDropDown={false}
      toggleDropDown={(): void => toggleDropDown()}
     >
      <div className={classes.list}>
       <div className={classes.add}>Add to playlist</div>
       <div className={classes.item_wrapper}>
        {user.playlists.map((item: any, index: number) => (
         <div
          className={classes.items}
          onClick={() => addSongToPlaylist(item.playlitId)}
          key={index}
         >
          {item.tittle}
         </div>
        ))}
       </div>
      </div>
     </DropDown>
    )}
   </button>
  </div>
 );
}

export default ReleaseItemAction;
