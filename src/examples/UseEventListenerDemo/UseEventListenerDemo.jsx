
import {useRef,useState,useCallback} from 'react'
import {useEventListener} from '../../hooks/useEventListener'

function UseEventListenerDemo() {

    const [show, setShow] = useState(false);

    const divRef = useRef(null);

  const handleClick = useCallback(() => {
    console.log('Button clicked via callback ref!');
  }, []);

  // Use the hook without providing a target. It returns a callback ref.
   useEventListener('click', handleClick,divRef);

  // Attach the returned ref to your element
  return <>
    <button onClick={() => setShow(prev => !prev)}>
      {show ? 'Hide' : 'Show'} Div
    </button>
    {!show && <div ref={divRef} style={{border: '1px solid black', padding: '20px'}}>
      Click me (callback ref)
    </div>}
  </>;
}

export {UseEventListenerDemo};