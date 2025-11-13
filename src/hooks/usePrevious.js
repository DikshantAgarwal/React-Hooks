import { useRef, useEffect, useMemo } from "react";

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
  const { deep = false, debug = false, historySize = 1, resetKey } = options;

  const firstRender = useRef(true);
  const lastResetKey = useRef(resetKey);

  const historyRef = useRef([]);

  // Check if we need to reset due to resetKey change
  const shouldReset =
    resetKey !== undefined && resetKey !== lastResetKey.current;
    console.log("shouldReset:", shouldReset, "resetKey:", resetKey, "lastResetKey:", lastResetKey.current);
  if (shouldReset) {
    historyRef.current = [];
    lastResetKey.current = resetKey;
    // firstRender.current = true;
  }

  const hasChanged = useMemo(() => {
    if (deep && typeof value === "object" && value !== null) {
      return JSON.stringify(value) !== JSON.stringify(historyRef.current[0]);
    }

    return historyRef.current[0] !== value;
  }, [deep, value,]);

  useEffect(() => {
    // Reset history if resetKey changed

    if (!firstRender.current || hasChanged) {
      historyRef.current = [
        value,
        ...historyRef.current.slice(0, historySize - 1),
      ];
    }
    firstRender.current = false;
  }, [value, historySize, hasChanged]);

  if (debug && !firstRender.current) {
    console.log("usePrevious Debug:", {
      current: value,
      previous: historyRef.current[0],
      history: historyRef.current,
    });
  }

  const previousValue = historyRef.current[0];
  const history = historyRef.current.slice(0);

  return { previous: previousValue, history };
}

export { usePrevious };
