import React, { useState } from 'react';
import { useCounter } from '../../hooks/useCounetr.js';
import './UseCounterDemo.css';

const UseCounterDemo = () => {
  // Configuration state
  const [step, setStep] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [mode, setMode] = useState('wrap'); // wrap, clamp, normal
  const [manualValue, setManualValue] = useState('');
  
  // Prepare options for useCounter
  const options = {
    step: step,
    min: mode === 'normal' ? undefined : min,
    max: mode === 'normal' ? undefined : max,
    clamp: mode === 'clamp',
    wrap: mode === 'wrap'
  };
  
  const { value, inc, dec, updateValue, reset, isMin, isMax } = useCounter(5, options);
  
  const handleManualValueSubmit = (e) => {
    e.preventDefault();
    const numValue = Number(manualValue);
    if (!isNaN(numValue)) {
      updateValue(numValue);
      setManualValue('');
    }
  };
  
  const getManualValueStatus = () => {
    const numValue = Number(manualValue);
    if (isNaN(numValue) || manualValue === '') return '';
    
    if (mode === 'wrap' && min !== undefined && max !== undefined) {
      if (numValue > max) return `(Currently shows wrapped to ${min})`;
      if (numValue < min) return `(Currently shows wrapped to ${max})`;
    } else if (mode === 'clamp' && min !== undefined && max !== undefined) {
      if (numValue > max) return `(Currently shows clamped to ${max})`;
      if (numValue < min) return `(Currently shows clamped to ${min})`;
    }
    return '';
  };

  return (
    <div className="use-counter-demo">
      <div className="use-counter-demo__header">
        <h2 className="use-counter-demo__title">useCounter Demo</h2>
        <p className="use-counter-demo__subtitle">Test wrap/clamp/normal behavior</p>
      </div>
      
      <div className="use-counter-demo__current-value">
        <div className="use-counter-demo__value-display">
          Current Value: {value}
        </div>
        {isMax() && (
          <div className="use-counter-demo__status">[ At Max ]</div>
        )}
        {isMin() && (
          <div className="use-counter-demo__status">[ At Min ]</div>
        )}
      </div>
      
      <div className="use-counter-demo__controls">
        <button 
          className="use-counter-demo__button use-counter-demo__button--decrement"
          onClick={dec}
        >
          [-]
        </button>
        <button 
          className="use-counter-demo__button use-counter-demo__button--reset"
          onClick={reset}
        >
          Reset
        </button>
        <button 
          className="use-counter-demo__button use-counter-demo__button--increment"
          onClick={inc}
        >
          [+]
        </button>
      </div>
      
      <div className="use-counter-demo__manual-input">
        <h3 className="use-counter-demo__section-title">Set value manually:</h3>
        <form onSubmit={handleManualValueSubmit} className="use-counter-demo__form">
          <input
            type="number"
            value={manualValue}
            onChange={(e) => setManualValue(e.target.value)}
            className="use-counter-demo__input"
            placeholder="Enter value"
          />
          <button 
            type="submit" 
            className="use-counter-demo__button use-counter-demo__button--submit"
          >
            Set
          </button>
        </form>
        <div className="use-counter-demo__manual-status">
          {getManualValueStatus()}
        </div>
      </div>
      
      <div className="use-counter-demo__configuration">
        <h3 className="use-counter-demo__section-title">Configuration:</h3>
        
        <div className="use-counter-demo__config-row">
          <label className="use-counter-demo__label">
            Step: 
            <input
              type="number"
              value={step}
              onChange={(e) => setStep(e.target.value || 1)}
              className="use-counter-demo__input use-counter-demo__input--small"
              min="1"
            />
          </label>
        </div>
        
        <div className="use-counter-demo__config-row">
          <label className="use-counter-demo__label">
            Min: 
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="use-counter-demo__input use-counter-demo__input--small"
              disabled={mode === 'normal'}
            />
          </label>
        </div>
        
        <div className="use-counter-demo__config-row">
          <label className="use-counter-demo__label">
            Max: 
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="use-counter-demo__input use-counter-demo__input--small"
              disabled={mode === 'normal'}
            />
          </label>
        </div>
        
        <div className="use-counter-demo__mode-selection">
          <h4 className="use-counter-demo__mode-title">Mode:</h4>
          <div className="use-counter-demo__radio-group">
            <label className="use-counter-demo__radio-label">
              <input
                type="radio"
                name="mode"
                value="wrap"
                checked={mode === 'wrap'}
                onChange={(e) => setMode(e.target.value)}
                className="use-counter-demo__radio"
              />
              <span className="use-counter-demo__radio-text">Wrap</span>
            </label>
            
            <label className="use-counter-demo__radio-label">
              <input
                type="radio"
                name="mode"
                value="clamp"
                checked={mode === 'clamp'}
                onChange={(e) => setMode(e.target.value)}
                className="use-counter-demo__radio"
              />
              <span className="use-counter-demo__radio-text">Clamp</span>
            </label>
            
            <label className="use-counter-demo__radio-label">
              <input
                type="radio"
                name="mode"
                value="normal"
                checked={mode === 'normal'}
                onChange={(e) => setMode(e.target.value)}
                className="use-counter-demo__radio"
              />
              <span className="use-counter-demo__radio-text">Normal</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="use-counter-demo__reset-section">
        <button 
          className="use-counter-demo__button use-counter-demo__button--reset-initial"
          onClick={reset}
        >
          Reset to Initial Value
        </button>
      </div>
    </div>
  );
};

export default UseCounterDemo;