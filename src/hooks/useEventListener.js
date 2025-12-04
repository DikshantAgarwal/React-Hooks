import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook to manage event listeners dynamically.
 * @param {string} eventName - The name of the event (e.g., 'click').
 * @param {function} handler - The event handler function.
 * @param {EventTarget | RefObject | null | undefined} target - The event target (DOM node, window, document, or ref object).
 * @returns {function} A callback ref function to attach to a React element if no target is provided.
 * 
 * USage:
 * 
 * // Example 1: Using with a specific target
 * const divRef = useRef(null); 
 * useEventListener('click', handleClick, divRef);
 * 
 * // Example 2: Using without a target (returns a callback ref)
 * const eventListenerRef = useEventListener('click', handleClick);
 * <div ref={eventListenerRef}>Click me</div>
 * 
 * On conditionally rendering elements, accepting a target ref is not recommended, you need to use the callback ref approach.
 */
function useEventListener(eventName, handler, target ) {
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
    if (!isSupported) {
      return;
    }

    // Create event listener that calls handler stored in the ref
    const listener = (event) => savedHandler.current(event);

    // Add event listener
    if(Array.isArray(eventName)){
        eventName.forEach((evName)=>{
            targetElement.addEventListener(evName, listener);
        });
    } else {
      console.log("useEventListener: attaching", eventName, "to", targetElement,listener);
        targetElement.addEventListener(eventName, listener);
    }
 
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