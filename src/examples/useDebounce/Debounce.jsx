import React, { useState, useEffect } from "react";
import "./Debounce.css";
import { useDebounce } from "../../hooks/useDebounce";

/**
 * Debounce example component
 * Shows immediate input value and debounced value
 */


const DELAY = 500; // 500 milliseconds
function Debounce() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [apiCount, setApiCount] = useState(0);
  const debouncedText = useDebounce(text, DELAY);


  // Progress animation for debounce delay
  useEffect(() => {
    if (text && text !== debouncedText) {
      setIsWaiting(true);
      setProgress(0);
      
      const startTime = Date.now();
      const duration = DELAY; // Should match debounce delay
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        
        if (newProgress < DELAY) {
          requestAnimationFrame(updateProgress);
        } else {
          setIsWaiting(false);
        }
      };
      
      requestAnimationFrame(updateProgress);
    } else {
      setIsWaiting(false);
      setProgress(0);
    }
  }, [text, debouncedText]);

  useEffect(() => {
    // You can perform side effects with debouncedText here
    // For example, making API calls
    if (!debouncedText) {
      setResult("");
      setStatus("idle");
      return;
    }
    fetch(`https://dummyjson.com/products/search?q=${debouncedText}`)
      .then((res) => {
        setApiCount((count) => count + 1);
        setStatus("loading");
        return res.json();
      })
      .then((result) => {
        setResult(result);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [debouncedText]);

  const isLoading = status === "loading";
  const isError = status === "error";
  const isSuccess = status === "success";

  // Determine input visual state
  const getInputState = () => {
    if (isError) return 'error';
    if (isLoading) return 'loading';
    if (text && text !== debouncedText) return 'typing';
    if (debouncedText && isSuccess) return 'success';
    return 'idle';
  };

  const inputState = getInputState();



  return (
    <div className={`debounce debounce--${inputState}`}>
      <h3 className="debounce__title">Debounce demo</h3>

      <label className="debounce__label">
        <div>Search:</div>
        <div className="debounce__input-wrapper">
          <input
            className={`debounce__input debounce__input--${inputState}`}
            value={text}
            onChange={(e) => {setText(e.target.value);setKeystrokeCount((count) => count + 1)}}
            placeholder="Start typing..."
          />
          <div className="debounce__input-icon">
            {inputState === 'loading' && <span className="debounce__spinner">⏳</span>}
            {inputState === 'typing' && <span className="debounce__typing">✏️</span>}
            {inputState === 'success' && <span className="debounce__success">✅</span>}
            {inputState === 'error' && <span className="debounce__error-icon">❌</span>}
            {inputState === 'idle' && <span className="debounce__search">🔍</span>}
          </div>
        </div>
      </label>

      {/* Progress bar for debounce delay */}
      {isWaiting && (
        <div className="debounce__progress-container">
          <div className="debounce__progress-bar">
            <div 
              className="debounce__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="debounce__progress-text">
            Waiting for you to stop typing... {Math.round(progress)}%
          </div>
        </div>
      )}

      {/* Status indicator */}
      <div className={`debounce__status debounce__status--${inputState}`}>
        {inputState === 'loading' && <div className={`debounce__status-message debounce__status-message--${inputState}`}>🔍 Searching...</div>}
        {inputState === 'success' && debouncedText && <div className={`debounce__status-message debounce__status-message--${inputState}`}>✅ Results for "{debouncedText}"</div>}
        {inputState === 'error' && <div className={`debounce__status-message debounce__status-message--${inputState}`}>❌ Search failed</div>}
        {inputState === 'idle' && !text && <div className={`debounce__status-message debounce__status-message--${inputState}`}>💡 Start typing to search...</div>}
        {inputState === 'typing' && <div className={`debounce__status-message debounce__status-message--${inputState}`}>✏️ typing...</div>}
      </div>

      <div className="debounce__api-count">
        API Calls Made: {apiCount}
      </div>

      <div className="debounce__keystroke-count">
        Keystroke Hit : {keystrokeCount}
      </div>

      <div className={`debounce__api-result debounce__api-result--${inputState}`}>
        <strong className="debounce__result-label">Results:</strong>
        {isLoading && <div className="debounce__loading debounce__loading--active">Loading...</div>}
        {isError && (
          <div className="debounce__error debounce__error--visible">Error fetching results</div>
        )}
        {isSuccess && (
          <>
            {result && result.products && result.products.length > 0 ? (
              <ul className="debounce__result-list debounce__result-list--populated">
                {result.products.map((product, index) => (
                  <li key={product.id} className={`debounce__result-item debounce__result-item--${index % 2 === 0 ? 'even' : 'odd'}`}>
                    {product.title}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="debounce__no-results debounce__no-results--empty">No results found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export { Debounce };
