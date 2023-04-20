import React, { ReactNode } from "react";
import useScrollTop from "../Hooks/useScrollTop";

interface ScrollElementProp {
 children?: ReactNode;
 divStyle?: React.CSSProperties;
 shadow?:string
}
const ScrollElement: React.FC<ScrollElementProp> = (props: ScrollElementProp) => {

  const [scrollTop, scrollProps] = useScrollTop();
  const isNumber = typeof scrollTop === 'number';
  const scrollPropsObject = scrollProps as { onScroll: (event: React.UIEvent<HTMLElement>) => void };


 return <div
 {...scrollPropsObject}
  style={{
         ...props.divStyle,
          boxShadow:
            isNumber && scrollTop > 0 ? `inset 0 15px 20px -10px ${props.shadow}` : "none",
          transition: "box-shadow 0.3s",
  }}
 >
{props.children}
 </div>
}
export default ScrollElement;