import React from 'react';
import { useInput } from '../../hooks/useInput';
import './UseInputDemo.css';

function UseInputDemo() {
  // Text input demo
  const textInput = useInput('', {
    type: 'text'
  });

  // Number input demo
  const numberInput = useInput('', {
    type: 'number'
  });

  // Sanitized input demo (removes special characters)
  const sanitizeFn = (value) => {
    return value.replace(/[!@#$%^&*()]/g, '');
  };
  
  const sanitizedInput = useInput('', {
    type: 'text',
    sanitizeFn: sanitizeFn
  });

  // Trimmed input demo
  const trimmedInput = useInput('', {
    type: 'text',
    trim: true
  });


  return (
    <div className="use-input-demo">
      <div className="use-input-demo__header">
        <h1 className="use-input-demo__title">useInput Demo</h1>
      </div>

      {/* Text Input Section */}
      <div className="use-input-demo__section">
        <h2 className="use-input-demo__section-title">TEXT INPUT</h2>
        <div className="use-input-demo__field">
          <label className="use-input-demo__label">Username</label>
          <input
            {...textInput.bind}
            className="use-input-demo__input"
            placeholder="Enter username"
          />
          <div className="use-input-demo__info">
            <p className="use-input-demo__info-item">
              <span className="use-input-demo__info-label">Input:</span> {textInput.value || '(empty)'}
            </p>
            <p className="use-input-demo__info-item">
              <span className="use-input-demo__info-label">Parsed:</span> "{textInput.parsedValue}"
            </p>
            <p className="use-input-demo__info-item">
              <span className="use-input-demo__info-label">IsValidNumber:</span> {textInput.isValidNumber(textInput.value).toString()}
            </p>
          </div>
          <div className="use-input-demo__buttons">
            <button
              className="use-input-demo__button use-input-demo__button--reset"
              onClick={textInput.reset}
            >
              Reset
            </button>
            <button
              className="use-input-demo__button use-input-demo__button--set"
              onClick={() => textInput.setValue('john doe')}
            >
              Set Programmatically
            </button>
          </div>
        </div>
      </div>

      <div className="use-input-demo__separator"></div>

      {/* Number Input Section */}
      <div className="use-input-demo__section">
        <h2 className="use-input-demo__section-title">NUMBER INPUT</h2>
        <div className="use-input-demo__field">
          <label className="use-input-demo__label">Age</label>
          <input
            {...numberInput.bind}
            className="use-input-demo__input"
            placeholder="Enter age"
          />
          <div className="use-input-demo__info">
            <p className="use-input-demo__info-item">
              <span className="use-input-demo__info-label">Input:</span> {numberInput.value  || '(empty)'}
            </p>
            <p className="use-input-demo__info-item">
              <span className="use-input-demo__info-label">Parsed:</span> {numberInput.parsedValue !== null ? numberInput.parsedValue : 'null'}
            </p>
            <p className="use-input-demo__info-item">
              <span className="use-input-demo__info-label">IsValidNumber:</span> {numberInput.isValidNumber(numberInput.value).toString()}
            </p>
          </div>
          <div className="use-input-demo__note">
            <p className="use-input-demo__note-item">
              • Raw value (string): "{numberInput.value}"
            </p>
            <p className="use-input-demo__note-item">
              • Parsed value (number or null): {numberInput.parsedValue !== null ? numberInput.parsedValue : 'null'}
            </p>
            <p className="use-input-demo__note-item">
              • Validity: {numberInput.isValidNumber(numberInput.value).toString()}
            </p>
          </div>
          <div className="use-input-demo__buttons">
            <button
              className="use-input-demo__button use-input-demo__button--reset"
              onClick={numberInput.reset}
            >
              Reset
            </button>
            <button
              className="use-input-demo__button use-input-demo__button--set"
              onClick={() => numberInput.setValue('25')}
            >
              Set Programmatically (set "25")
            </button>
            <button
              className="use-input-demo__button use-input-demo__button--invalid"
              onClick={() => numberInput.setValue('12.')}
            >
              Set Invalid ("12.")
            </button>
          </div>
        </div>
      </div>

      <div className="use-input-demo__separator"></div>

      {/* Sanitized Input Section */}
      <div className="use-input-demo__section">
        <h2 className="use-input-demo__section-title">SANITIZED INPUT</h2>
        <div className="use-input-demo__field">
          <label className="use-input-demo__label">No Special Characters</label>
          <input
            {...sanitizedInput.bind}
            className="use-input-demo__input"
            placeholder="Try typing !@#$%^&*()"
          />
          <p className="use-input-demo__description">
            (sanitizeFn removes !@#$%^&*)
          </p>
          <div className="use-input-demo__info">
            <p className="use-input-demo__info-item">
              <span className="use-input-demo__info-label">Input:</span> {sanitizedInput.value || '(empty)'}
            </p>
          </div>
          <div className="use-input-demo__buttons">
            <button
              className="use-input-demo__button use-input-demo__button--reset"
              onClick={sanitizedInput.reset}
            >
              Reset
            </button>
            <button
              className="use-input-demo__button use-input-demo__button--set"
              onClick={() => sanitizedInput.setValue('Hello!@#World')}
            >
              Set Programmatically
            </button>
          </div>
        </div>
      </div>

      <div className="use-input-demo__separator"></div>

      {/* Trimmed Input Section */}
      <div className="use-input-demo__section">
        <h2 className="use-input-demo__section-title">TRIMMED INPUT</h2>
        <div className="use-input-demo__field">
          <label className="use-input-demo__label">Trimmed Field</label>
          <input
            {...trimmedInput.bind}
            className="use-input-demo__input"
            placeholder="Try typing with leading/trailing spaces"
          />
          <p className="use-input-demo__description">
            (trim = true)<br />
            Note: leading/trailing spaces disappear on blur
          </p>
          <div className="use-input-demo__info">
            <p className="use-input-demo__info-item">
              <span className="use-input-demo__info-label">Input:</span> "{trimmedInput.value}"
            </p>
          </div>
          <div className="use-input-demo__buttons">
            <button
              className="use-input-demo__button use-input-demo__button--reset"
              onClick={trimmedInput.reset}
            >
              Reset
            </button>
            <button
              className="use-input-demo__button use-input-demo__button--set"
              onClick={() => trimmedInput.setValue('  spaced text  ')}
            >
              Set Programmatically
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UseInputDemo;