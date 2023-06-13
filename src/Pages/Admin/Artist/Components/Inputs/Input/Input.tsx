import React, { ChangeEvent } from "react";
import classes from "./Input.module.css";
import { useState } from "react";

interface InputProps {
 isDisabled?: boolean;
 handleChange?: (value: any) => void;
 label?: string;
 type?: string;
 forLbl?: string;
 value?: any;
 ref?: React.RefObject<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
 isDisabled,
 handleChange,
 label,
 type,
 forLbl,
 value,
 ref,
}) => {
 const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0] || null;
  if (file) {
   setFileName(file?.name);
  }
  if (handleChange) {
   handleChange(file);
  }
 };
 const [fileName, setFileName] = useState("");
 return (
  <div
   className={`${classes.input_wrapper} ${isDisabled ? classes.disabled : ""}`}
  >
   {type !== "file" ? (
    <label htmlFor={forLbl} className={classes.label}>
     {label}
    </label>
   ) : (
    <label className={classes.label}>{label}</label>
   )}

   {type !== "file" ? (
    <input
     id={forLbl}
     type={type}
     disabled={isDisabled}
     value={value}
     ref={ref}
     onChange={(e) => (handleChange ? handleChange(e.target.value) : null)}
     className={classes.input}
    />
   ) : (
    <div className={classes.file_wrapper}>
     <span> {fileName}</span>
     <label htmlFor={forLbl} className={classes.file_label}>
      select
     </label>
     <input
      type="file"
      id={forLbl}
      ref={ref}
      disabled={isDisabled}
      onChange={(e) => handleFileChange(e)}
      className={`${classes.input} ${classes.file}`}
     />
    </div>
   )}
  </div>
 );
};

export default Input;
