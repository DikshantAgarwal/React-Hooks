
import './App.css'
import {LocalStorageDemo} from './examples/LocalStorageDemo/LocalStorageDemo';
import { Debounce } from './examples/useDebounce/Debounce';
import {FetchDemo} from './examples/FetchDemo/FetchDemo';
import {PreviousCounter } from  './examples/PreviousCounter/PreviousCounter';
import {Toggle} from './examples/Toggle/Toggle';

function App() {

  return (
    <>
      <h1>React Hooks</h1>
       <PreviousCounter/>
       <Toggle/>
      {/* <FetchDemo /> */}
      {/* <Debounce /> */}
      {/* <LocalStorageDemo /> */}
    </>
  )
}

export default App
