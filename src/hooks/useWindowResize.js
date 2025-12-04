import { useEventListener, useDebounce } from "./index";
import { useCallback, useState, useLayoutEffect,useMemo, use } from "react";



function useWindowResize(customBreakPoints = {},options = {}) {

    const debounceMS = options.debounceMS || 150;
    const breakpointsDefault = useMemo(() => ({
      mobile: 600,
      tablet: 1024,
      desktop: 1440,
      ...customBreakPoints
    }), [customBreakPoints]);

  const [height, setHeight] = useState( typeof window !== 'undefined' ? window.innerHeight : 0);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  const listener = useCallback(() => {
      if (typeof window === "undefined") {
          return;
        }
        console.log("useWindowResize: resizing to", window.innerWidth, window.innerHeight);
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }, []);

    useLayoutEffect(() => {
      listener(); // Set initial size
    }, [listener]);


  const debouncedListener = useDebounce(listener, debounceMS);
   
  useEventListener("resize", debouncedListener, window);

const breakpointValues = useMemo(() => ({
  isMobileView: width < breakpointsDefault.mobile,
  isTabletView: width >= breakpointsDefault.mobile && width < breakpointsDefault.tablet,
  isDesktopView: width >= breakpointsDefault.tablet
}), [width,breakpointsDefault]);

const { isMobileView, isTabletView, isDesktopView } = breakpointValues;
  return { height, width, isMobileView, isTabletView, isDesktopView };
}

export { useWindowResize };
