import { useEffect, useState } from "react";
import { IPlaylist } from "../../types/IPlaylist";
import classes from "./Collab.module.css";
import ApiCall from "../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../Common/Api/ENDPOINTS";
import CollabItem from "./CollabItem";
import useDebounce from "../../../../Hooks/useDebounce";
import Switch from "../../../../Components/Inputs/Switch/Switch";

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
interface UserApi {
 userId: string;
 userName: string;
}

const PlaylistCollaborators: React.FC<CollabProps> = ({
 handleToggle,
 playlist,
}) => {
 const closePortal = () => {
  handleToggle();
 };
 const [collabs, setCollabs] = useState<ICollab[] | undefined>();
 const [search, setSearch] = useState<string>("");
 const debouncer = useDebounce(search, 2000);
 const [results, setResults] = useState<UserApi[] | null>(null);
 const [newCollabId, setNCI] = useState<number | null>(null);
 const [canAdd, setCanAdd] = useState<boolean>(false);
 const [canDElete, setcanDelete] = useState<boolean>(false);
 useEffect(() => {
  const getCollabs = async () => {
   if (playlist?.playlistId) {
    try {
     const res = await ApiCall.get(
      ENDPOINTS.USER.SONGS.PLAYLISTS.GET_COLLABS(playlist.playlistId)
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

 useEffect(() => {
  const searchUsers = async () => {
   try {
    const res = await ApiCall.get(ENDPOINTS.FILTER.SONGUSER(debouncer));
    if (res.data.isSuccess) {
     setResults(res.data.result);
    }
   } catch (error) {
    // do something
   }
  };
  if (debouncer !== "") {
   searchUsers();
  }
 }, [debouncer]);

 //
 const [active, setActive] = useState<number | null>(null);
 const handleActive = (index: number) => {
  if (index === active) {
   setActive(null);
  } else {
   setActive(index);
  }
 };
 const handleChangeRelease = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedReleaseId = parseInt(event.target.value);
  setNCI(selectedReleaseId);
 };
 return (
  <div className={classes.main}>
   <div className={classes.body}>
    <div className={classes.header}>
     <div onClick={closePortal}>X</div>
    </div>
    <div className={classes.content}>
     <div>
      <div>Add Collaboration</div>
      <div>
       <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search user"
       />
       {results && (
        <select onChange={handleChangeRelease}>
         <option disabled selected value="">
          Select a release
         </option>
         {results.map((item: UserApi) => (
          <option key={item.userId} value={item.userId}>
           {item.userName}
          </option>
         ))}
        </select>
       )}
      </div>
      {newCollabId && (
       <div>
        <div>
         Can Add Songs
         <Switch
          isOn={canAdd}
          onColor="#EF476F"
          handleToggle={() => setCanAdd(!canAdd)}
          htmlFor={"newAdd" + newCollabId}
         />
        </div>
        <div>
         Can Remove Songs
         <Switch
          isOn={canDElete}
          onColor="#EF476F"
          handleToggle={() => setcanDelete(!canDElete)}
          htmlFor={"newRemove" + newCollabId}
         />
        </div>
       </div>
      )}
     </div>
     {collabs?.map((item: ICollab) => (
      <CollabItem
       key={item.id}
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
