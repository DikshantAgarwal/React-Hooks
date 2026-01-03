import { useEffect,  useRef, useCallback } from "react";

function useInterval(callback, delay) {
  const callbackRef = useRef(callback);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const scheduleIntervalFunc = useCallback(
    (...args) => {
      intervalIdRef.current = setInterval(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    if(delay === undefined || delay === null){
      return;
    }
    clearInterval(intervalIdRef.current);
    scheduleIntervalFunc();
    return () => clearInterval(intervalIdRef.current);
  }, [scheduleIntervalFunc, delay]);




  function pause() {
    clearInterval(intervalIdRef.current);
  }
  function resume() {
      clearInterval(intervalIdRef.current);
      scheduleIntervalFunc();
  }


  return { pause, resume };
}

export { useInterval };
