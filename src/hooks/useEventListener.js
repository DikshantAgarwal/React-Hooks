import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook to manage event listeners dynamically.
 * @param {string} eventName - The name of the event (e.g., 'click').
 * @param {function} handler - The event handler function.
 * @param {EventTarget | RefObject | null | undefined} target - The event target (DOM node, window, document, or ref object).
 * @returns {function} A callback ref function to attach to a React element if no target is provided.
 */
function useEventListener(eventName, handler, target) {
  const savedHandler = useRef();
const [dynamicNode, setDynamicNode] = useState(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  // If no target is provided, we return a callback ref for convenience in React elements
 const callbackRef = useCallback(node => {
    setDynamicNode(node);
  }, []);

  useEffect(() => {
    // Determine the actual element to attach the listener to
    let targetElement;

    if (target) {
      targetElement = target.current ?? target;
    } else {
      // If no target is provided, use the node from the callbackRef logic (if applicable)
      targetElement = dynamicNode
    }
    
    // Ensure the target supports addEventListener
    const isSupported = targetElement && targetElement.addEventListener;
    console.log('Target Element:', targetElement,isSupported);
    if (!isSupported) {
      return;
    }

    // Create event listener that calls handler stored in the ref
    const listener = (event) => savedHandler.current(event);

    // Add event listener
    targetElement.addEventListener(eventName, listener);

    // Cleanup function
    return () => {
      targetElement.removeEventListener(eventName, listener);
    };
  }, [eventName, target,dynamicNode]); // Depend only on eventName and the original target argument

  // If the user provided a target, they don't need the callback ref return value.
  // We return it only when they need to attach it to a React element directly.
  return callbackRef; 
}


export { useEventListener };