import { useEffect,  useRef, useCallback } from "react";

function useTimeOut(callback, delay) {
  const callbackRef = useRef(callback);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const scheduleTimeoutFunc = useCallback(
    (...args) => {
      timeoutIdRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    if(delay === undefined || delay === null){
      return;
    }
    clearTimeout(timeoutIdRef.current);
    scheduleTimeoutFunc();
    return () => clearTimeout(timeoutIdRef.current);
  }, [scheduleTimeoutFunc, delay]);


  function clear() {
    clearTimeout(timeoutIdRef.current);
  }
  function reset() {
      clearTimeout(timeoutIdRef.current);
      scheduleTimeoutFunc();
  }


  return { reset,clear };
}

export { useTimeOut };
