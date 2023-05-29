import React, { useEffect, useState, ReactNode } from "react";
import classes from "./DropDown.module.css";

type DropDownProps = {
 children?: ReactNode;
 showDropDown: boolean;
 toggleDropDown: Function;
};

const DropDown: React.FC<DropDownProps> = (
 props: DropDownProps
): JSX.Element => {
 const [showDropDown, setShowDropDown] = useState<boolean>(false);

 useEffect(() => {
  setShowDropDown(showDropDown);
 }, [showDropDown]);

 return (
  <>
   <div
    className={` ${classes.dropdown} ${showDropDown ? "" : classes.active}`}
   >
    {props.children}
   </div>
  </>
 );
};

export default DropDown;
