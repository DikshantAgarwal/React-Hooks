import { useEffect, useState } from "react";

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
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  if (Number.isNaN(delay) || delay < 0) {
    throw new Error("useDebounce: delay must be a non-negative number");
  }
  if (typeof value === "undefined") {
    throw new Error("useDebounce: value must be defined");
  }

  useEffect(() => {
    let timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);


  if (delay === 0) {
    return value;
  }

  return debouncedValue;
}

export { useDebounce };
