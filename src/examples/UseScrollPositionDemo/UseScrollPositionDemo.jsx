import { useScrollPosition } from "../../hooks/useScrollPosition"
import React from "react";
function UseScrollPositionDemo(){

  const containerRef =  React.useRef(null);
    const {scrollX,scrollY,direction, backToTop} = useScrollPosition({ target: containerRef });

    return (
        <>
            <div style={{marginBottom:8}}>X: {scrollX} Y: {scrollY} Dir: {direction} <button onClick={backToTop}>Back to top</button></div>
            <div ref={containerRef} style={{width:'200px',height:'200px',backgroundColor:'lightblue',overflow:"scroll"}}>
            Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
             Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
              Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
               Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
                <span style={{color:'red'}}>Loresum</span>Ops  
                
                 Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 

                  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
                   Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
                    Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
                     Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
                      Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
                       Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
                        Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops Ops 
                         Loresum Ops  Loresum Ops 
                          Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
                           Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 

                            Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
                             Loresum Ops 

                              Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 
                               Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops  Loresum Ops 


        </div>
        </>
    )

}

export { UseScrollPositionDemo }