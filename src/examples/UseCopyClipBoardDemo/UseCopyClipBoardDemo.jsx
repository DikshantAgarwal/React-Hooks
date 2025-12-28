import React, { useState } from 'react';
import { useCopyClipBoard } from '../../hooks';
import './UseCopyClipBoardDemo.css';

function UseCopyClipBoardDemo() {
  const [text, setText] = useState('Hello from clipboard demo!');
  const { copy, isCopied, error } = useCopyClipBoard();

  const handleCopy = () => {
    copy(text);
  };

  return (
    <div className="use-copy-clipboard-demo">
      <div className="use-copy-clipboard-demo__header">
        <h1 className="use-copy-clipboard-demo__title">useCopyClipBoard Hook Demo</h1>
        <p className="use-copy-clipboard-demo__description">Copy text to clipboard and show status.</p>
      </div>

      <div className="use-copy-clipboard-demo__body">
        <label className="use-copy-clipboard-demo__label" htmlFor="copy-input">Text to copy</label>
        <input
          id="copy-input"
          className="use-copy-clipboard-demo__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="use-copy-clipboard-demo__actions">
          <button
            className={`use-copy-clipboard-demo__button ${isCopied ? 'use-copy-clipboard-demo__button--success' : 'use-copy-clipboard-demo__button--primary'}`}
            onClick={handleCopy}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>

          {error && <div className="use-copy-clipboard-demo__error">{error.message}</div>}
        </div>

        <pre className="use-copy-clipboard-demo__preview">{text}</pre>
      </div>
    </div>
  );
}

export { UseCopyClipBoardDemo };
