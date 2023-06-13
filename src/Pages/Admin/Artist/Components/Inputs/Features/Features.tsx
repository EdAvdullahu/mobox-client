import classes from "./Features.module.css";
import { useState, useEffect } from "react";
import useDebounce from "../../../../../../Hooks/useDebounce";
import ApiCall from "../../../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../../../Common/Api/ENDPOINTS";
import DropDown from "../../../../../../Components/Inputs/Dropdown/DropDown";
interface FeatureProps {
 index: number;
 handleChange: (value: feature[]) => void;
}
interface artist {
 artistId: number;
 imageUrl: string;
 name: string;
}
interface feature {
 songId: 0;
 artistID: number;
 featureRole: 1;
}
interface displayFeature {
 artistID: number;
 name: string;
}
const Features: React.FC<FeatureProps> = ({ index, handleChange }) => {
 const [artists, setArtists] = useState<artist[]>([]);
 const [search, setSearch] = useState("");
 const [features, setFeatures] = useState<feature[]>([]);
 const [dFeatures, setDFeatures] = useState<displayFeature[]>([]);
 const debouncer = useDebounce(search, 500);
 useEffect(() => {
  ApiCall.getNoAuth(ENDPOINTS.ARTIST.FEATURE(debouncer), null).then((res) => {
   console.log(res.data);
   setArtists(res.data.result);
  });
 }, [debouncer]);

 //handle dropdown
 const [showDropDown, setShowDropDown] = useState<boolean>(false);
 const toggleDropDown = () => {
  setShowDropDown(!showDropDown);
 };
 const dismissHandler = (event: React.FocusEvent<HTMLInputElement>): void => {
  if (event.currentTarget === event.target) {
   setShowDropDown(false);
  }
 };

 // handle artist click
 const handleClick = (id: number, name: string) => {
  const disF: displayFeature = {
   artistID: id,
   name: name,
  };
  const newFeature: feature = {
   artistID: id,
   songId: 0,
   featureRole: 1,
  };
  setDFeatures([...dFeatures, disF]);
  setFeatures([...features, newFeature]);
 };

 // handle feature removal
 const removeFeature = (id: number) => {
  const index = features.findIndex((item: feature) => {
   return item.artistID === id;
  });
  console.log("INDEX", index);
  const feat = features;
  feat.splice(index, 1);
  setFeatures([...feat]);

  const dIndex = dFeatures.findIndex((item: displayFeature) => {
   return item.artistID === id;
  });
  const dFeat = dFeatures;
  console.log("DINDEX", dIndex);
  dFeat.splice(dIndex, 1);
  setDFeatures([...dFeat]);
 };

 // handle change
 useEffect(() => {
  handleChange(features);
 }, [features]);
 return (
  <div
   className={classes.wrapper}
   onBlur={(e: React.FocusEvent<HTMLInputElement>): void => dismissHandler(e)}
  >
   <div className={classes.input_group}>
    <label className={classes.label} htmlFor={"SelectFeature" + index}>
     Features
    </label>
    <input
     className={classes.input}
     onClick={(): void => toggleDropDown()}
     value={search}
     onChange={(e) => setSearch(e.target.value)}
     type="text"
    ></input>
    {showDropDown && (
     <DropDown
      showDropDown={showDropDown}
      toggleDropDown={() => {
       toggleDropDown();
      }}
     >
      <div className={classes.list}>
       <div className={classes.item_wrapper}>
        {artists &&
         artists.map((item: artist) => (
          <div
           className={classes.items}
           onClick={() => handleClick(item.artistId, item.name)}
           key={item.artistId}
          >
           {item.name}
          </div>
         ))}
       </div>
      </div>
     </DropDown>
    )}
   </div>
   <div
    className={classes.features}
    onBlur={(e: React.FocusEvent<HTMLInputElement>): void => dismissHandler(e)}
   >
    {dFeatures.length > 0 &&
     dFeatures.map((item: displayFeature) => (
      <div className={classes.feature} key={item.artistID}>
       {item.name}
       <button
        className={classes.remove}
        onClick={() => removeFeature(item.artistID)}
       >
        X
       </button>
      </div>
     ))}
   </div>
  </div>
 );
};

export default Features;
