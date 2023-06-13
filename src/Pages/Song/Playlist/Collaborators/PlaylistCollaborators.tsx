import { useEffect, useState } from "react";
import { IPlaylist } from "../../types/IPlaylist";
import classes from "./Collab.module.css";
import ApiCall from "../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../Common/Api/ENDPOINTS";
import CollabItem from "./CollabItem";

interface CollabProps {
 handleToggle: () => void;
 playlist: IPlaylist | undefined;
}
interface IUser {
 userId: number;
 userName: string;
}
interface ICollab {
 canAddSongs: boolean;
 canRemoveSongs: boolean;
 id: number;
 playlistId: string;
 user: IUser;
 userId: number;
}

const PlaylistCollaborators: React.FC<CollabProps> = ({
 handleToggle,
 playlist,
}) => {
 const closePortal = () => {
  handleToggle();
 };
 const [collabs, setCollabs] = useState<ICollab[] | undefined>();
 useEffect(() => {
  const getCollabs = async () => {
   if (playlist?.playlistId) {
    try {
     const res = await ApiCall.getNoAuth(
      ENDPOINTS.USER.SONGS.PLAYLISTS.GET_COLLABS(playlist.playlistId),
      null
     );
     if (res.data.isSuccess) {
      console.log("RESULT", res.data.result);
      setCollabs(res.data.result);
     }
    } catch (error) {
     console.log(error);
    }
   }
  };
  getCollabs();
 }, [playlist?.playlistId]);

 //
 const [active, setActive] = useState<number | null>(null);
 const handleActive = (index: number) => {
  if (index === active) {
   setActive(null);
  } else {
   setActive(index);
  }
 };
 return (
  <div className={classes.main}>
   <div className={classes.body}>
    <div className={classes.header}>
     <div onClick={closePortal}>X</div>
    </div>
    <div className={classes.content}>
     {collabs?.map((item: ICollab) => (
      <CollabItem
       onClick={() => handleActive(item.userId)}
       id={item.userId}
       name={item.user.userName}
       active={active}
       hasAdd={item.canAddSongs}
       hasRemove={item.canRemoveSongs}
      ></CollabItem>
     ))}
    </div>
   </div>
  </div>
 );
};
export default PlaylistCollaborators;
