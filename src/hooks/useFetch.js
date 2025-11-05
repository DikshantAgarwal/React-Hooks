import { useState, useReducer, useEffect, useRef, useCallback, useMemo } from "react";

function reducer(s, a) {
  return { ...s, ...a };
}

const defaultInitialState = {
  data: null,
  status: "idle",
  error: null,
};

function useFetch(url, initialState = defaultInitialState, options = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  let isCancelled = useRef(false);

  const stableOptions =  useMemo(() => options, [JSON.stringify(options)]);

  const fetchData = useCallback(() => {
    dispatch({ status: "loading" ,data: null, error: null}); // Reset state before new request
    fetch(url, stableOptions)
      .then((res) => {
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!isCancelled.current) dispatch({ data: data, status: "fetched" });
      })
      .catch((error) => {
        if (!isCancelled.current) dispatch({ error: error, status: "error" });
      });
  }, [url, stableOptions]);

  useEffect(() => {
    fetchData();

    return () => {
      isCancelled.current = true;
    };
  }, [url, options, fetchData]);

  if (!url || typeof url !== "string") {
    return { ...defaultInitialState, refetch: () => {} };
  }

  return { ...state, refetch: fetchData };
}

export { useFetch };
