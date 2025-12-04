import { useRef, useEffect, useState, useCallback } from "react";

/**
 * Custom hook that debounces a value by delaying updates until after a specified delay period.
 *
 * This hook is useful for scenarios like search inputs, API calls, or any situation where
 * you want to delay execution until the user stops changing a value for a certain period.
 *
 * @param {*} value - The value to debounce. Can be of any type (string, number, object, etc.)
 * @param {number} delay - The delay in milliseconds before the debounced value updates
 *
 * @returns {*} The debounced value that updates only after the delay period without new changes
 *
 * @example
 * // Basic usage with search input
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * // Use effect will only run when user stops typing for 500ms
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform API call
 *     fetchSearchResults(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 *
 * @example
 * // Usage with different data types
 * const debouncedString = useDebounce('hello', 300);
 * const debouncedNumber = useDebounce(42, 1000);
 * const debouncedObject = useDebounce({ name: 'John' }, 500);
 *
 * @author Dikshant Agarwal
 * @since 1.0.0
 */
function useDebounce(valueOrFunction, delay) {
  const [debouncedValue, setDebouncedValue] = useState(valueOrFunction);
  const timeoutRef = useRef(null);

  if (Number.isNaN(delay) || delay < 0) {
    throw new Error("useDebounce: delay must be a non-negative number");
  }
  if (typeof valueOrFunction === "undefined") {
    throw new Error("useDebounce: value must be defined");
  }

  const isValueFunction = typeof valueOrFunction === "function";

  const debouncedFunction = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      valueOrFunction(...args); 
    }, delay);
  },[valueOrFunction, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isValueFunction) {
      return; // Skip this effect for functions
    }
    let timerId = setTimeout(() => {
      setDebouncedValue(valueOrFunction);
    }, delay);

    return () => clearTimeout(timerId);
  }, [valueOrFunction, delay, isValueFunction]);

  if (delay === 0) {
    return valueOrFunction;
  }

  return isValueFunction ? debouncedFunction : debouncedValue;
}

export { useDebounce };
