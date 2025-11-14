import { useState, useCallback ,useMemo} from "react";

const useToggle = (initialValue, options = {}) => {
  const { circular = true } = options;
  const isArray = Array.isArray(initialValue);
  const isBoolean = typeof initialValue === "boolean";



  // ----------- VALIDATION -----------
  if (!isBoolean && !isArray) {
    throw new Error(
      "useToggle hook initial value must be a boolean or an array"
    );
  }

  if (isArray && initialValue.length < 2) {
    throw new Error(
      "useToggle hook initial value array must have at least two elements"
    );
  }

    // ----------- STABILIZE ARRAY INPUT -----------
  // Prevents bugs when parent passes a new array instance on each render.
  const stableArray = useMemo(() => {
    return isArray ? [...initialValue] : null;
  }, [isArray, initialValue]);

  // ----------- INITIAL VALUE SETTER -----------
  const getInitialValue = useCallback(() => {
    if (isBoolean) {
      return initialValue;
    }
    if (isArray) {
      return stableArray[0];
    }
  }, [initialValue, isArray,isBoolean,stableArray]);


  const [toggleValue, setToggleValue] = useState(getInitialValue);

  // ----------- ARRAY CURRENT INDEX -----------
  const currentIndex = isArray ? stableArray.indexOf(toggleValue) : -1;

    // ----------- TOGGLE / EXPLICIT SETTER ----------

  const handleToggleValue = useCallback(
    (explicitValue) => {
      if (explicitValue !== undefined) {
        return setToggleValue(explicitValue);
      }

      if (isBoolean) {
        return setToggleValue((preValue) => !preValue);
      }
    },
    [isBoolean]
  );

    // ----------- RESET -----------
  const reset = useCallback(() => {
    setToggleValue(getInitialValue());
  }, [getInitialValue]);


    // ----------- ARRAY NEXT -----------

  const next = useCallback(() => {
    if (!isArray) return;
    if (currentIndex === stableArray.length - 1) {
      if (circular) {
        setToggleValue(stableArray[0]);
      }
      return ; 
    } 
      setToggleValue(stableArray[currentIndex + 1]);

  }, [isArray, circular, currentIndex, stableArray]);


   // ----------- ARRAY PREVIOUS -----------
  const previous = useCallback(() => {
    if (!isArray) return;
    if (currentIndex === 0) {
      if (circular) {
        setToggleValue(stableArray[stableArray.length - 1]);
      }
      return ;
    } 
      setToggleValue(stableArray[currentIndex - 1]);
    
  }, [currentIndex, stableArray, circular, isArray]);


 // ----------- SET TRUE / SET FALSE (booleans only) -----------
  const setTrue = useCallback(() => {
    isBoolean && setToggleValue(true);
  }, [isBoolean]);

  const setFalse = useCallback(() => {
    isBoolean && setToggleValue(false);
  }, [isBoolean]);

  
  // ----------- GO TO INDEX -----------
  const goToIndex = useCallback(
    (index) => {
      if (!isArray) return;

      if (index < 0 || index >= stableArray.length) {
        throw new Error("Index out of bounds");
      }
      setToggleValue(stableArray[index]);
    },
    [stableArray, isArray]
  );

  const getCurrentIndex = useCallback(() => {
      return isArray ? currentIndex : undefined;
  }, [currentIndex, isArray]);

  const goToFirst = useCallback(() => {
    if (!isArray) return;
    return setToggleValue(stableArray[0]);
  }, [stableArray, isArray]);

  const goToLast = useCallback(() => {
    if (!isArray) return;

    return setToggleValue(stableArray[stableArray.length - 1]);
  },[isArray, stableArray]);

  const isFirst = useCallback(() => {
    if (!isArray) return;
    return currentIndex === 0;
  },[isArray,currentIndex]);
  
  const isLast = useCallback(() => {
    if (!isArray) return;
    return currentIndex === stableArray.length - 1;
  }, [currentIndex, stableArray, isArray]);

  if (isArray) {
    return {
      next,
      previous,
      value: toggleValue,
      reset,
      goToIndex,
      getCurrentIndex,
      goToFirst,
      goToLast,
      isFirst,
      isLast,
    };
  }
    return {
      value: toggleValue,
      toggle: handleToggleValue,
      reset,
      setTrue,
      setFalse,
    };
};

export { useToggle };
