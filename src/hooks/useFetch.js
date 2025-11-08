import {useReducer, useEffect, useRef, useCallback, useMemo } from "react";

function reducer(s, a) {
  return { ...s, ...a };
}

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  FETCHED: "fetched",
  ERROR: "error",
}
const defaultInitialState = {
  data: null,
  status: STATUS.IDLE,
  error: null,
};


function useFetch(url, initialState = defaultInitialState, options = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const abortControllerRef = useRef(null);
  const stableOptions =  useMemo(() => options, [JSON.stringify(options)]);

  const fetchData = useCallback((overrideUrl) => {
     abortControllerRef.current?.abort(); // cancel any previous fetch
     abortControllerRef.current = new AbortController();
    dispatch({ status: STATUS.LOADING, data: null, error: null }); // Reset state before new request
    fetch(overrideUrl || url, stableOptions)
      .then((res) => {
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        dispatch({ data: data, status: STATUS.FETCHED, error: null });
      })
      .catch((error) => {
       dispatch({ error: error, status: STATUS.ERROR });
      });
  }, [url, stableOptions]);

  useEffect(() => { 
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url,fetchData]);

  if (!url || typeof url !== "string") {
    return { ...defaultInitialState, refetch: () => {} };
  }

  return { ...state, refetch: fetchData };
}

export { useFetch };
