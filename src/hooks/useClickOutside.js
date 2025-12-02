import { useEventListener } from "./useEventListener";
import { useEffect, useRef, useState, useCallback } from "react";

function useClickOutside(target, handler, options = {}) {
  if (!handler || typeof handler !== "function") {
    throw new Error("useClickOutside: handler must be a function");
  }
  const { enabled = true, events = ["click"] } = options;
  // const eventsArray = Array.isArray(events) && options.events.length > 0  ? events : ['click'];
  if (!events.every((e) => typeof e === "string")) {
    throw new Error("useClickOutside: all events must be strings");
  }
  const [dynamicNode, setDynamicNode] = useState(null);

  const savedHandler = useRef();
  const callbackRef = useCallback((node) => {
    setDynamicNode(node);
  }, []);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  const listener = useCallback(
    (event) => {
      if (!enabled) {
        return;
      }
      const element = target?.current ?? dynamicNode;

      console.log("useClickOutside: element =", element,event.target);

      if (!element || element.contains(event.target)) {
        return; // Click inside the element, do nothing
      }
      savedHandler.current?.(event);  
    },
    [dynamicNode, target, enabled]
  );

  useEventListener(events, listener, document);

  return callbackRef;
}

export { useClickOutside };
