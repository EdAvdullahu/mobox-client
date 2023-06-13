import React, { useEffect } from "react";
import classes from "./Toast.module.css";

export interface ToastProps {
 id: string;
 destroy: () => void;
 title: string;
 content: string;
 duration?: number;
}

const ToastItem: React.FC<ToastProps> = (props) => {
 const { destroy, content, title, duration = 0, id } = props;

 useEffect(() => {
  if (!duration) return;

  const timer = setTimeout(() => {
   destroy();
  }, duration);

  return () => clearTimeout(timer);
 }, [destroy, duration]);

 return (
  <div>
   <div className={classes.toast_header}>
    <div>
     {title} {id}
    </div>
    <button className={classes.button} onClick={destroy}>
     X
    </button>
   </div>
   <div className={classes.toast_body}>{content}</div>
  </div>
 );
};

export default ToastItem;
