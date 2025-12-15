
import './App.css'
import {LocalStorageDemo} from './examples/LocalStorageDemo/LocalStorageDemo';
import { Debounce } from './examples/useDebounce/Debounce';
import {FetchDemo} from './examples/FetchDemo/FetchDemo';
import {PreviousCounter } from  './examples/PreviousCounter/PreviousCounter';
import {Toggle} from './examples/Toggle/Toggle';
import UseInputDemo from './examples/UseInputDemo/UseInputDemo';
import UseCounterDemo from './examples/useCounterDemo/UseCounterDemo';
import {UseEventListenerDemo} from './examples/useEventListenerDemo/UseEventListenerDemo';
import {UseHoverDemo} from './examples/UseHoverDemo/UseHoverDemo'; 
import { UseClickOutsideDemo } from './examples/UseClickOutsideDemo/UseClickOutsideDemo';
import UseWindowResizeDemo from './examples/UseWindowResizeDemo/UseWindowResizeDemo';
import { UseScrollPositionDemo } from './examples/UseScrollPositionDemo/UseScrollPositionDemo';
function App() {

  return (
    <>
      <h1>React Hooks</h1>
      <UseScrollPositionDemo />
      {/* <UseWindowResizeDemo /> */}
      {/* <UseClickOutsideDemo /> */}
      {/* <UseHoverDemo /> */}
      {/* <UseEventListenerDemo /> */}
      {/* <UseInputDemo /> */}
      {/* <UseCounterDemo /> */}
       {/* <PreviousCounter/> */}
       {/* <Toggle/> */}
      {/* <FetchDemo /> */}
      {/* <Debounce /> */}
      {/* <LocalStorageDemo /> */}
    </>
  )
}

export default App
