import { MultiSelect } from "react-multi-select-component";
import classes from "./CustomMultiselect.module.css";
import "./CustomMultiSelector.css";
interface options {
 value: any;
 label: string;
}
interface MultiSelectProps {
 isDisabled?: boolean;
 handleChange?: (value: any) => void;
 label: string;
 forLbl?: string;
 value: options[];
 options: options[];
}
const CustomMulitiselect: React.FC<MultiSelectProps> = ({
 isDisabled,
 handleChange,
 label,
 forLbl,
 value,
 options,
}) => {
 return (
  <div className={classes.wrapper}>
   <label className={classes.label} htmlFor={forLbl}>
    {label}
   </label>
   <MultiSelect
    options={options}
    value={value}
    onChange={handleChange}
    labelledBy={label}
    className="custom-multiselect-input-release"
   />
  </div>
 );
};

export default CustomMulitiselect;
