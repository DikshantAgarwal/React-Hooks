import { useEventListener, useDebounce } from "./index";
import { useCallback, useState, useEffect, useRef } from "react";

function useScrollPosition(options = { target: null }) {
  const debounceMS = options.debounceMS || 150;

  const previousY = useRef();
  const frameRef = useRef(null);
  let direction = "none";

  const resolveTarget = useCallback(() =>
   options.target?.current ?? options.target ?? (typeof window !== 'undefined' ? window : null), [options.target]);

//   console.log("Target:", resolveTarget(), options.target);
  const [scrollX, setScrollX] = useState(
    resolveTarget() === window ? window.scrollX : resolveTarget()?.scrollLeft || 0
  );
  const [scrollY, setScrollY] = useState(
    resolveTarget() === window ? window.scrollY : resolveTarget()?.scrollTop || 0
  );

const prev = previousY.current ?? scrollY;
console.log("Prev:", prev, "Current:", scrollY);
direction = scrollY > prev ? "down" : scrollY < prev ? "up" : "none";
previousY.current = scrollY;
const listener = useCallback(() => {
    if (frameRef.current) return;
    const el = resolveTarget();
    frameRef.current = requestAnimationFrame(() => {
      const currentX =
        el === window ? window.scrollX : el?.scrollLeft || 0;
      const currentY =
        el === window ? window.scrollY : el?.scrollTop || 0;
        

    setScrollX(currentX);
    setScrollY(currentY);
    frameRef.current = null;
    })
  }, [resolveTarget]);

  useEffect(() => {
    listener(); // Set initial size
  }, [listener]);

  const debouncedListener = useDebounce(listener, debounceMS);

  useEventListener("scroll", listener, resolveTarget());

  const backToTop = () => {
    setScrollX(0);
    setScrollY(0);
    resolveTarget().scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return { scrollX, scrollY, direction, backToTop };
}

export { useScrollPosition };
