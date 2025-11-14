import { useRef, useEffect } from "react";

/**
 * Custom hook that returns the previous value of a state or prop.
 *
 * @param {*} value - The current value to track
 * @param {Object} options - Configuration options
 * @param {boolean} options.deep - Use deep comparison for objects/arrays
 * @param {boolean} options.debug - Enable debug logging
 * @param {number} options.historySize - Number of previous values to keep in history
 * @param {*} options.resetKey - When this value changes, the history will be reset
 * @returns {Object} Object containing previous value and history array
 *
 * @example
 * const [count, setCount] = useState(0);
 * const [mode, setMode] = useState('number');
 * const {previous: prevCount, history} = usePrevious(count, {resetKey: mode});
 */

function usePrevious(value, options = {}) {

  console.log("usePrevious called with value:", value, "and options:", options);
  const { deep = false, debug = false, historySize = 1, resetKey } = options;

  const firstRender = useRef(true);
  const lastResetKey = useRef(resetKey);

  const historyRef = useRef([]);

  // Check if we need to reset due to resetKey change
  const shouldReset =
    resetKey !== undefined && resetKey !== lastResetKey.current;
  if (shouldReset) {
    historyRef.current = [];
    lastResetKey.current = resetKey;
    firstRender.current = true;
  }
  const valueChanged = firstRender.current || 
    (deep && typeof value === "object" && value !== null ? 
      JSON.stringify(value) !== JSON.stringify(historyRef.current[0]) :
      historyRef.current[0] !== value);


  useEffect(() => {
    // On first render or when value actually changes

    console.log("hasChangesd:", valueChanged, "firstRender:", firstRender.current);
    
    if (valueChanged) {
      historyRef.current = [
        value,
        ...historyRef.current.slice(0, historySize - 1),
      ];
    }
    firstRender.current = false;
  }, [value, historySize, deep,valueChanged]);

  if (debug && !firstRender.current) {
    console.log("usePrevious Debug:",firstRender.current, {
      current: value,
      previous: historyRef.current[0],
      history: historyRef.current,
    });
  }

  if(valueChanged){
    const previousValue = historyRef.current[0]; // Previous value is at index 0
    const history = historyRef.current.slice(0); // Full history including current

    return { previous: previousValue, history };

  } else {
    const previousValue = historyRef.current[1]; // Previous value is at index 0
    const history = historyRef.current.slice(1); // Full history including current

    return { previous: previousValue, history };
  }

  // Debug log when needed
  // console.log("Value has changed. Current:", value, "Previous:", previousValue);

}

export { usePrevious };
