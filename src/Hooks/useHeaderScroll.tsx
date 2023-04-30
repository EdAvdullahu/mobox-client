import { useEffect, useRef } from "react";

interface UseHeaderScrollProps {
 rootScrollerRef: React.RefObject<HTMLDivElement>;
 height: number;
}

function useHeaderScroll({ rootScrollerRef, height }: UseHeaderScrollProps) {
 const headerRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const rootScroller = rootScrollerRef.current;
  if (!rootScroller) return;

  const handleScroll = () => {
   if (!headerRef.current) return;

   const value = Math.floor(rootScroller.scrollTop);
   headerRef.current.style.height =
    height - 2 * value > 100 ? height - 2 * value + "px" : "100px";
  };

  rootScroller.addEventListener("scroll", handleScroll);

  return () => {
   rootScroller.removeEventListener("scroll", handleScroll);
  };
 }, [rootScrollerRef, height]);

 return headerRef;
}

export default useHeaderScroll;
