import React, { useState, useEffect } from 'react';
import {usePrevious} from '../../hooks/usePrevious';
import './PreviousCounter.css';

// Simple deep equality check
const deepEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object') return a === b;
    
    try {
        return JSON.stringify(a) === JSON.stringify(b);
    } catch {
        return false;
    }
};

const PreviousCounter = () => {
    const [count, setCount] = useState(0);
    const [stringValue, setStringValue] = useState('Hello');
    const [objectValue, setObjectValue] = useState({ id: 1, name: 'John', score: 100 });
    const [arrayValue, setArrayValue] = useState([1, 2, 3, 4, 5]);
    const [historySize, setHistorySize] = useState(5);
    const [mode, setMode] = useState('number');
    const [resetKey, setResetKey] = useState(0);

    // Reset usePrevious when mode changes
    useEffect(() => {
        setResetKey(prev => prev + 1);
    }, [mode]);
    
    // Get current value based on mode
    const getCurrentValue = () => {
        switch(mode) {
            case 'number': return count;
            case 'string': return stringValue;
            case 'object': return objectValue;
            case 'array': return arrayValue;
            default: return count;
        }
    };
    
    const currentValue = getCurrentValue();
    const {previous: prevValue, history} = usePrevious(currentValue, {historySize, debug: true, deep: mode === 'object' || mode === 'array', resetKey});

    const handleIncrement = () => {
        if (mode === 'number') {
            setCount(count + 1);
        } else if (mode === 'string') {
            setStringValue(stringValue + 'x');
        } else if (mode === 'array') {
            setArrayValue([...arrayValue, arrayValue.length + 1]);
        } else if (mode === 'object') {
            setObjectValue({...objectValue, score: objectValue.score + 10});
        }
    };

    const handleDecrement = () => {
        if (mode === 'number') {
            setCount(count - 1);
        } else if (mode === 'string') {
            setStringValue(stringValue.slice(0, -1));
        } else if (mode === 'array') {
            setArrayValue(arrayValue.slice(0, -1));
        } else if (mode === 'object') {
            setObjectValue({...objectValue, score: Math.max(0, objectValue.score - 10)});
        }
    };

    const handleReset = () => {
        if (mode === 'number') {
            setCount(0);
        } else if (mode === 'string') {
            setStringValue('Hello');
        } else if (mode === 'array') {
            setArrayValue([1, 2, 3, 4, 5]);
        } else if (mode === 'object') {
            setObjectValue({ id: 1, name: 'John', score: 100 });
        }
    };

    const handleHistorySizeChange = (e) => {
        setHistorySize(parseInt(e.target.value));
    };

        const inputModes = () => {
            switch(mode) {
                case 'number':  
                    return (
                        <input 
                            type="number" 
                            value={count} 
                            onChange={(e) => setCount(Number(e.target.value))}  
                            className="previous-counter__input" 
                        />
                    ); 
                case 'string':  
                    return (
                        <input 
                            type="text" 
                            value={stringValue} 
                            onChange={(e) => setStringValue(e.target.value)} 
                            className="previous-counter__input" 
                        />
                    ); 
                case 'object':  
                    return (
                        <textarea 
                            value={JSON.stringify(objectValue, null, 2)} 
                            onChange={(e) => {
                                try {
                                    const parsed = JSON.parse(e.target.value);
                                    setObjectValue(parsed);
                                } catch {
                                    // Invalid JSON, ignore
                                }
                            }} 
                            className="previous-counter__textarea" 
                            rows="4"
                        />
                    ); 
                case 'array':   
                    return (
                        <textarea 
                            value={JSON.stringify(arrayValue, null, 2)} 
                            onChange={(e) => {
                                try {
                                    const parsed = JSON.parse(e.target.value);
                                    if (Array.isArray(parsed)) {
                                        setArrayValue(parsed);
                                    }
                                } catch {
                                    // Invalid JSON or not an array, ignore
                                }
                            }} 
                            className="previous-counter__textarea"
                            rows="4" 
                        />
                    ); 
                default:        
                    return (
                        <input 
                            type="number" 
                            value={count} 
                            onChange={(e) => setCount(Number(e.target.value))} 
                            className="previous-counter__input" 
                        />
                    );
            }
        };

    return (
        <div className={`previous-counter previous-counter--${mode}`}>
            <div className="previous-counter__header">
                <h2 className="previous-counter__title">Previous Counter Demo</h2>
                <p className="previous-counter__description">
                    Demonstrates the usePrevious hook with history tracking ({mode} mode)
                </p>
            </div>

            <div className="previous-counter__mode-selector">
                <select 
                    value={mode} 
                    onChange={(e) => setMode(e.target.value)}
                    className="previous-counter__mode-select"
                >
                    <option value="number">🔢 Number Mode</option>
                    <option value="string">📝 String Mode</option>
                    <option value="object">🏷️ Object Mode</option>
                    <option value="array">📋 Array Mode</option>
                </select>
            </div>

            {inputModes()}


            <div className="previous-counter__content">
                <div className="previous-counter__display">
                    <div className="previous-counter__value">
                        <span className="previous-counter__label">Current:</span>
                        <span className="previous-counter__number previous-counter__number--current">
                            {typeof currentValue === 'object' ? JSON.stringify(currentValue) : String(currentValue)}
                        </span>
                    </div>
                    <div className="previous-counter__value">
                        <span className="previous-counter__label">Previous:</span>
                        <span className="previous-counter__number previous-counter__number--previous">
                            {prevValue !== undefined ? 
                                (typeof prevValue === 'object' ? JSON.stringify(prevValue) : String(prevValue)) : 
                                'None'
                            }
                        </span>
                    </div>
                </div>

                <div className="previous-counter__history-config">
                    <label className="previous-counter__label">
                        History Size:
                        <input 
                            type="number" 
                            min="1" 
                            max="10" 
                            value={historySize}
                            onChange={handleHistorySizeChange}
                            className="previous-counter__input"
                        />
                    </label>
                </div>

                <div className="previous-counter__history">
                    <h4 className="previous-counter__history-title">
                        {mode === 'number' && '🔢'} 
                        {mode === 'string' && '📝'} 
                        {mode === 'object' && '🏷️'} 
                        {mode === 'array' && '📋'} 
                        Value History ({mode})
                    </h4>
                    <div className="previous-counter__history-list">
                        {history.length > 0 ? (
                            history.map((value, index) => (
                                <span 
                                    key={index} 
                                    className="previous-counter__history-item"
                                    title={typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                >
                                    {typeof value === 'object' 
                                        ? JSON.stringify(value).substring(0, 50) + (JSON.stringify(value).length > 50 ? '...' : '')
                                        : String(value)
                                    }
                                </span>
                            ))
                        ) : (
                            <span className="previous-counter__history-empty">No history yet</span>
                        )}
                    </div>
                </div>

                <div className="previous-counter__controls">
                    <button 
                        className="previous-counter__button previous-counter__button--decrement"
                        onClick={handleDecrement}
                    >
                        {mode === 'number' ? '-1' : 
                         mode === 'string' ? 'Remove Char' :
                         mode === 'array' ? 'Remove Item' :
                         mode === 'object' ? '-10 Score' : '-1'}
                    </button>
                    <button 
                        className="previous-counter__button previous-counter__button--reset"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button 
                        className="previous-counter__button previous-counter__button--increment"
                        onClick={handleIncrement}
                    >
                        {mode === 'number' ? '+1' : 
                         mode === 'string' ? 'Add Char' :
                         mode === 'array' ? 'Add Item' :
                         mode === 'object' ? '+10 Score' : '+1'}
                    </button>
                </div>
            </div>

            <div className="previous-counter__info">
                <span className="previous-counter__mode-badge">{mode}</span>
                <p className="previous-counter__text">
                    {prevValue !== undefined && !deepEqual(prevValue, currentValue) && (
                        <>
                            Changed from {typeof prevValue === 'object' ? JSON.stringify(prevValue) : String(prevValue)} to {typeof currentValue === 'object' ? JSON.stringify(currentValue) : String(currentValue)}
                        </>
                    )}
                    {deepEqual(prevValue, currentValue) && prevValue !== undefined && (
                        <>
                            Value remains {typeof currentValue === 'object' ? JSON.stringify(currentValue) : String(currentValue)}
                        </>
                    )}
                    {mode === 'number' && currentValue === 0 && prevValue !== undefined && prevValue !== 0 && (
                        <>
                            Reset to 0 from {prevValue}
                        </>
                    )}
                    {mode === 'string' && currentValue === 'Hello' && prevValue !== undefined && prevValue !== 'Hello' && (
                        <>
                            Reset to "Hello" from "{prevValue}"
                        </>
                    )}
                    {prevValue === undefined && (
                        <>
                            Initial {mode} value: {typeof currentValue === 'object' ? JSON.stringify(currentValue) : String(currentValue)}
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export {PreviousCounter};