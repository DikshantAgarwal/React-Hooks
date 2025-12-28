import {  useEffect, useState  } from "react";

function useMediaQuery(query ) {

if(query === undefined || query === null || query === '' ){
    throw new Error("No media query provided");
}  


const getIntialMatch = () => {
    if(typeof window === 'undefined' || typeof window.matchMedia === 'undefined'){
        return false;
    }
    return window.matchMedia(query).matches;
}

const [isMatch,setIsMatch] = useState(getIntialMatch());

useEffect(() => {
    if(typeof window === 'undefined' || typeof window.matchMedia === 'undefined'){
        return;
    }
    const mediaQueryList = window.matchMedia(query);

    const listener = (event) => {
        setIsMatch(event.matches);
    }
    mediaQueryList.addEventListener('change',listener);

    // Set initial value
    setIsMatch(mediaQueryList.matches);     
    return () => {
        mediaQueryList.removeEventListener('change',listener);
    }
}, [query]);
return isMatch;

}

export { useMediaQuery };
