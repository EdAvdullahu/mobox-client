import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
 children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
 const elRef = useRef(document.createElement("div"));

 useEffect(() => {
  const modalRoot = document.getElementById("song-portal-target");
  if (modalRoot) {
   modalRoot.appendChild(elRef.current);
  }

  return () => {
   if (modalRoot) {
    modalRoot.removeChild(elRef.current);
   }
  };
 }, []);

 return ReactDOM.createPortal(children, elRef.current);
};

export default Portal;
