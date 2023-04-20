import { useState } from "react";

const useScrollTop = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const onScroll = (event: React.UIEvent<HTMLElement>) =>
    setScrollTop(event.currentTarget.scrollTop);
  return [scrollTop, { onScroll }];
};

export default useScrollTop;