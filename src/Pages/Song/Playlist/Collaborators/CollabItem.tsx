import Switch from "../../../../Components/Inputs/Switch/Switch";
import ArrowPink from "../../../../Assets/Svg/ArrowPink";
import classes from "./Collab.module.css";
import { useState } from "react";

interface props {
 id: number;
 name: string;
 onClick: () => void;
 active: number | null;
 hasAdd: boolean;
 hasRemove: boolean;
}

const CollabItem: React.FC<props> = ({
 id,
 name,
 onClick,
 active,
 hasAdd,
 hasRemove,
}) => {
 const [hasAP, setADd] = useState<boolean>(hasAdd);
 const [hasRP, setRem] = useState<boolean>(hasRemove);
 return (
  <div
   className={`${classes.collab_item} ${
    active === id ? classes.collab_active : ""
   }`}
  >
   <div className={classes.visable}>
    <div>{name}</div>
    <div
     onClick={onClick}
     className={`${classes.arrow_base} ${
      active === id ? "" : classes.arrow_active
     }`}
    >
     <ArrowPink />
    </div>
   </div>
   <div className={classes.actions}>
    <div className={classes.permissions}>
     <div>
      Can Add Songs
      <Switch
       isOn={hasAP}
       htmlFor={"add" + id}
       onColor="#EF476F"
       handleToggle={() => setADd(!hasAP)}
      />
     </div>
     <div>
      Can Remove Songs
      <Switch
       isOn={hasRP}
       htmlFor={"remove" + id}
       onColor="#EF476F"
       handleToggle={() => setRem(!hasRP)}
      />
     </div>
    </div>
    <div className={classes.buttons}>
     <button>Save</button>
     <button>Remove</button>
    </div>
   </div>
  </div>
 );
};
export default CollabItem;
