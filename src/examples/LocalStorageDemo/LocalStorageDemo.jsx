import React from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./LocalStorageDemo.css";

function LocalStorageDemo() {
  const [storedValue, setValue, removeValue] = useLocalStorage(
    "name",
    "John Doe"
  );
  const [storedTheme, setTheme] = useLocalStorage(
    "theme",
    "light"
  );

  const [inputValue, setInputValue] = React.useState(storedValue);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const clearValue = () => {
    setInputValue("");
    removeValue();
  };
  return (
    <div className={`local-storage-demo local-storage-demo--theme-${storedTheme}`}>
      <h3 className="local-storage-demo__title">LocalStorage Demo</h3>
      <div className="local-storage-demo__input-group">
        <label htmlFor="name-input" className="local-storage-demo__label">Enter your name:</label>
        <input
          id="name-input"
          className="local-storage-demo__input"
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      <p className="local-storage-demo__saved-name">
        Saved Name: {storedValue} {storedValue && <span className="local-storage-demo__saved-name-indicator">✅</span>}
      </p>
      <div className="local-storage-demo__button-group">
        <button
          className="local-storage-demo__button local-storage-demo__button--clear"
          onClick={clearValue}
        >
          Clear Storage
        </button>
        <button
          className="local-storage-demo__button local-storage-demo__button--save"
          onClick={() => setValue(inputValue)}
          disabled={!inputValue}
        >
          Save Storage
        </button>
      </div>
      <div className="local-storage-demo__message">
        💬 "Refresh the page — your name stays!"
      </div>
      <div className="local-storage-demo__theme">Theme
        <span className="local-storage-demo__theme-option" onClick={() => setTheme('Light')}>🌞 Light</span>
        <span className="local-storage-demo__theme-option" onClick={() => setTheme('Dark')}>🌙 Dark</span>
      </div>
    </div>
  );
}

export { LocalStorageDemo };
