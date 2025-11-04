import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
   let timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

export { useDebounce };
