import React from "react";
import classes from "./Switch.module.css";

interface SwitchProps {
 isOn: boolean;
 handleToggle: () => void;
 onColor?: string;
 htmlFor: string;
}

const Switch: React.FC<SwitchProps> = ({
 isOn,
 handleToggle,
 onColor,
 htmlFor,
}) => {
 const defaultColor = "#CCCCCC";
 return (
  <>
   <input
    checked={isOn}
    onChange={handleToggle}
    className={classes.react_switch_checkbox}
    id={htmlFor}
    type="checkbox"
   />
   <label
    style={{ background: isOn ? onColor : defaultColor }}
    className={classes.react_switch_label}
    htmlFor={htmlFor}
   >
    <span className={classes.react_switch_button} />
   </label>
  </>
 );
};

export default Switch;
