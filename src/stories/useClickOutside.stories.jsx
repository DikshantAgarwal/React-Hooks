import { UseClickOutsideDemo } from "../examples/UseClickOutsideDemo/UseClickOutsideDemo";

export default {
  title: "Hooks/useClickOutside",
  tags: ["autodocs"], 
  parameter:{
    docs:{
        description:{
            page:() => (
        <>
          <h2>useToggle</h2>

          <p>
            A simple hook to toggle boolean state.
          </p>

          <h3>Usage</h3>
          <pre>
            <code>{`const [on, toggle] = useToggle(false);`}</code>
          </pre>

          <h3>Example</h3>
          <UseToggleDemo />
        </>
      ),
            
        }
    }
  }
};


export const Default = () => <UseClickOutsideDemo />;
