import React from "react";
import classes from "./Textarea.module.css";

interface inputProps {
 isDisabled: boolean;
 handleChange?: (value: any) => void;
 label: string;
 forLbl: string;
 value: any;
 columns?: number;
 rows: number;
}

const Textarea: React.FC<inputProps> = ({
 isDisabled,
 handleChange,
 label,
 forLbl,
 value,
 columns,
 rows,
}) => {
 return (
  <div
   className={`${classes.input_wrapper} ${isDisabled ? classes.disabled : ""}`}
  >
   <label htmlFor={forLbl} className={classes.label}>
    {label}
   </label>
   <textarea
    disabled={isDisabled}
    value={value}
    rows={rows}
    onChange={(e) => (handleChange ? handleChange(e.target.value) : null)}
    className={classes.input}
   ></textarea>
  </div>
 );
};
export default Textarea;
