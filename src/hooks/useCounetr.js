import { useState,useRef } from "react";

function useCounter(initialValue, options = {}) {
  if (Number.isNaN(initialValue) || typeof initialValue !== "number") {
    throw new Error("useCounter:- Please provide numerical Value");
  }

  const { step = 1, min, max, clamp = false, wrap = false } = options;


  const initialNum = useRef(Number(initialValue));

  const [value, setValue] = useState(initialNum.current);

  const isMaxMin = () => {

    if(min === undefined || max === undefined) {
        return false;
    }
    if (min >= max) {
        console.warn("useCounter:- min should be less than max");
        return false;
    }

    return true;
  };


  const normalizeValue =(value) => {

    const  parsedValue = Number(value);
    if(Number.isNaN(parsedValue)) {
        return initialNum.current;
    }
    if(!isMaxMin()) {
        return parsedValue;
    }

    if(wrap){
        if(parsedValue > max) return min;
        if(parsedValue < min) return max;
        return parsedValue;
    } else if(clamp){
        return Math.min(Math.max(parsedValue, min), max);
    }
    return parsedValue;
  }

  const inc = () => {
    setValue(prev => normalizeValue(prev + Number(step)));
  };


  const dec = () => {
    setValue(prev => normalizeValue(prev - Number(step)));
  };

  const updateValue = (newValue) => {
   setValue(() => normalizeValue(newValue));
  };

  const reset = () => {
    setValue(initialNum.current);
  };

  const isMin = () => {
    if(!isMaxMin()) {
        return false;
    }
    return value === min;
  };
  const isMax = () => {
        if(!isMaxMin()) {
        return false;
    }
    return value === max;
  };

  return { value, inc, dec, updateValue, reset , isMin , isMax };
}

export { useCounter };
