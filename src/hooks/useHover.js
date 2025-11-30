import { useState, useCallback} from 'react';
import { useEventListener } from './useEventListener';


function useHover(otherRef) {

const [dynamicNode,setDynamicNode] = useState(null);
const [isHovered,setIsHovered] = useState(false);

 const callbackRef = useCallback((node)=>{
    setDynamicNode(node)
 },[]);

 // Stable event handlers
 const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
 }, []);

 const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
 }, []);

 let targetElement = null;
 
 if (otherRef) {
     // Handle ref objects vs direct elements
     targetElement = otherRef && typeof otherRef === 'object' && 'current' in otherRef 
     ? otherRef.current 
     : otherRef;
    } else {
        targetElement = dynamicNode;
}
useEventListener('mouseenter',handleMouseEnter, targetElement);
useEventListener('mouseleave',handleMouseLeave, targetElement);

 
 
  
 if(otherRef){
    return isHovered;
 }
  return [ isHovered,callbackRef ];
}


export { useHover };