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

      {/* Usage Example */}
      <section className="use-copy-clipboard-demo__code">
        <h2 className="use-copy-clipboard-demo__code-title">Usage Example</h2>
        <pre className="use-copy-clipboard-demo__code-block">
          <code>{`const { copy, isCopied, error } = useCopyClipBoard();

// Copy some text
copy('Text to copy');

// Check status
if (isCopied) console.log('Just copied!');
if (error) console.error(error);

// Useful for copy-to-clipboard buttons or quick-share features.`}</code>
        </pre>
      </section>
    </div>
  );
}

export { UseCopyClipBoardDemo };
