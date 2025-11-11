import {useReducer, useRef, useCallback, useMemo, useEffect } from "react";

function reducer(s, a) {
  return { ...s, ...a };
}

export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  FETCHED: "fetched",
  ERROR: "error",
}
const defaultInitialState = {
  data: null,
  duration:null,
  status: STATUS.IDLE,
  error: null,
};


function useFetch(url, initialState = defaultInitialState, options = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const abortControllerRef = useRef(null);
  
  const optionsString = JSON.stringify(options);
  const stableOptions = useMemo(() => options, [optionsString]);

  const fetchData = useCallback((overrideUrl) => {

    console.log('useFetch fetchData called with URL:', overrideUrl || url);
     abortControllerRef.current?.abort(); // cancel any previous fetch
     abortControllerRef.current = new AbortController();
    dispatch({ status: STATUS.LOADING, data: null, error: null }); // Reset state before new request

    const start = performance.now();
    fetch(overrideUrl || url, { ...stableOptions, signal: abortControllerRef.current.signal })
      .then((res) => {
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const end = performance.now();
        dispatch({ data: data, status: STATUS.FETCHED, error: null ,duration: (end - start).toFixed(0) });
      }
      )
      .catch((error) => {
       dispatch({ error: error, status: STATUS.ERROR });
      });
  }, [url, stableOptions]);



  useEffect(() => {
    if (!url) return;
    fetchData();  
  }, [url, fetchData]);


  return { ...state, refetch: fetchData,cancel: () => abortControllerRef.current?.abort() };
}

export { useFetch };
