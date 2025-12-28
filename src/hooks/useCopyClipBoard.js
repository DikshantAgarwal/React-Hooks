import {  useEffect, useState  } from "react";

function useCopyClipBoard( ) {
    const [isCopied,setIsCopied] = useState(false);
    const [error,setError] = useState(null);

    async function copyToClipBoard(text){

        if(text === undefined || text === null){
            setError(new Error("No text provided to copy to clipboard"));
            setIsCopied(false);
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setError(null);
            return;
        }
        catch(err){

            setError(err);
            setIsCopied(false);
            return;
        }
    } 

    useEffect(() => {
        if(isCopied){
            const timer = setTimeout(() => {
                setIsCopied(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);


    return {copy : copyToClipBoard,isCopied,error}

}

export { useCopyClipBoard };
