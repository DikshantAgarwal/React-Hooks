import React, { useState } from 'react';
import './Toggle.css';
import { usePrevious,useToggle } from '../../hooks';

const historySize = 5;

const Toggle = () => {
    const [mode, setMode] = useState('boolean');
    const [arrayInput, setArrayInput] = useState('light,dark,system');
    const [jumpIndex, setJumpIndex] = useState('');



    // Parse array input
    const parseArrayInput = (input) => {
        return input.split(',').map(item => item.trim()).filter(item => item.length > 0);
    };

    const arrayItems = parseArrayInput(arrayInput);
    const isValidArray = arrayItems.length >= 2;

    

    // Initialize hooks for both modes
    const booleanToggle = useToggle(true);
    const arrayToggle = useToggle(isValidArray ? arrayItems : ['item1', 'item2']);

    // Get current toggle based on mode
    const currentToggle = mode === 'boolean' ? booleanToggle : arrayToggle;
    const { value, toggle, reset, setTrue, setFalse, next, previous, goToIndex, getCurrentIndex, isFirst, isLast } = currentToggle;
     const {_, history} = usePrevious(value, {historySize , debug: true, deep: false, resetKey: mode});

    // Add to history when value changes
    // React.useEffect(() => {
    //     if (mode === 'array') {
    //         setHistory(prev => {
    //             const newHistory = [...prev, value];
    //             return newHistory.slice(-5); // Keep last 5 values
    //         });
    //     }
    // }, [value, mode]);

    // // Clear history when mode changes
    // React.useEffect(() => {
    //     setHistory([]);
    // }, [mode]);

    const handleJumpToIndex = () => {
        const index = parseInt(jumpIndex);
        if (!isNaN(index) && index >= 0 && index < arrayItems.length) {
            goToIndex(index);
            setJumpIndex('');
        }
    };

    const handleArrayInputChange = (e) => {
        setArrayInput(e.target.value);
    };

    return (
        <div className="toggle-demo">
            {/* 1. Header Section */}
            <div className="toggle-demo__header">
                <h2 className="toggle-demo__title">Toggle Demo</h2>
                <p className="toggle-demo__description">
                    Showcase of useToggle behavior
                </p>
            </div>

            {/* 2. Mode Selector Section */}
            <div className="toggle-demo__mode-selector">
                <label className="toggle-demo__mode-label">
                    Mode:
                    <select 
                        value={mode} 
                        onChange={(e) => setMode(e.target.value)}
                        className="toggle-demo__mode-select"
                    >
                        <option value="boolean">Boolean</option>
                        <option value="array">Array</option>
                    </select>
                </label>
            </div>

            {/* 3. Array Items Input (Only in Array Mode) */}
            {mode === 'array' && (
                <div className="toggle-demo__array-input">
                    <label className="toggle-demo__array-label">
                        Array Items:
                        <input
                            type="text"
                            value={arrayInput}
                            onChange={handleArrayInputChange}
                            placeholder="light,dark,system"
                            className="toggle-demo__array-field"
                        />
                        <span className="toggle-demo__array-hint">
                            (hint: comma-separated)
                        </span>
                    </label>
                    {!isValidArray && (
                        <div className="toggle-demo__array-error">
                            Please enter at least 2 items
                        </div>
                    )}
                </div>
            )}

            {/* 4. Current Value Display */}
            <div className="toggle-demo__value-display">
                <div className="toggle-demo__value-label">Current Value</div>
                <div className="toggle-demo__value">
                    {mode === 'boolean' &&  
                        // (value ? 'TRUE' : 'FALSE') : 
                        `${value}`
                    }
                </div>
                {mode === 'array' && (
                    <div className="toggle-demo__index">
                         <div>{value}</div>
                        Index: {getCurrentIndex() + 1} / {arrayItems.length}
                    </div>
                )}
            </div>

            {/* 5. Controls Section */}
            <div className="toggle-demo__controls">
                {mode === 'boolean' ? (
                    /* Boolean Mode Controls */
                    <div className="toggle-demo__boolean-controls">
                        <button 
                            onClick={toggle}
                            className="toggle-demo__button toggle-demo__button--primary"
                        >
                            Toggle
                        </button>
                        <button 
                            onClick={setTrue}
                            className="toggle-demo__button toggle-demo__button--success"
                        >
                            Set True
                        </button>
                        <button 
                            onClick={setFalse}
                            className="toggle-demo__button toggle-demo__button--danger"
                        >
                            Set False
                        </button>
                        <button 
                            onClick={reset}
                            className="toggle-demo__button toggle-demo__button--secondary"
                        >
                            Reset
                        </button>
                    </div>
                ) : (
                    /* Array Mode Controls */
                    <div className="toggle-demo__array-controls">
                        {/* Row 1 — Simple Navigation */}
                        <div className="toggle-demo__control-row">
                            <button 
                                onClick={previous}
                                disabled={!isValidArray}
                                className="toggle-demo__button toggle-demo__button--secondary"
                            >
                                Previous
                            </button>
                            <button 
                                onClick={next}
                                disabled={!isValidArray}
                                className="toggle-demo__button toggle-demo__button--secondary"
                            >
                                Next
                            </button>
                        </div>

                        {/* Row 2 — Reset */}
                        <div className="toggle-demo__control-row">
                            <button 
                                onClick={reset}
                                className="toggle-demo__button toggle-demo__button--primary"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Row 3 — Jump to Index */}
                        <div className="toggle-demo__control-row toggle-demo__jump-row">
                            <label className="toggle-demo__jump-label">
                                Jump to index:
                                <input
                                    type="number"
                                    value={jumpIndex}
                                    onChange={(e) => setJumpIndex(e.target.value)}
                                    min="0"
                                    max={arrayItems.length - 1}
                                    className="toggle-demo__jump-input"
                                />
                            </label>
                            <button 
                                onClick={handleJumpToIndex}
                                disabled={!isValidArray || jumpIndex === ''}
                                className="toggle-demo__button toggle-demo__button--primary"
                            >
                                Go
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 6. Small Status Indicators (Array Mode) */}
            {mode === 'array' && isValidArray && (
                <div className="toggle-demo__status">
                    <span className="toggle-demo__status-item">
                        (isFirst: {isFirst() ? 'true' : 'false'})
                    </span>
                    <span className="toggle-demo__status-item">
                        (isLast: {isLast() ? 'true' : 'false'})
                    </span>
                </div>
            )}

            {/* 7. Tiny History Row */}
            {mode === 'array' && (
                <div className="toggle-demo__history">
                    <span className="toggle-demo__history-label">History:</span>
                    <span className="toggle-demo__history-items">
                        {history.length === 0 ? (
                            <span className="toggle-demo__history-item">No history</span>
                        ) : (
                            <>
                                {history.reverse().map((item, index) => (
                                    <React.Fragment key={index}>
                                        <span className="toggle-demo__history-item">"{item}"</span>
                                        <span className="toggle-demo__history-arrow"> → </span>
                                    </React.Fragment>
                                ))}
                                <span className="toggle-demo__history-item toggle-demo__history-item--current">"{value}"</span>
                            </>
                        )}
                    </span>
                </div>
            )}
        </div>
    );
};

export { Toggle };
