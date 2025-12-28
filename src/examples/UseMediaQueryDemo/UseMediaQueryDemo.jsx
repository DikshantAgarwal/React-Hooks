import React, { useState } from 'react';
import { useMediaQuery } from '../../hooks';
import './UseMediaQueryDemo.css';

function UseMediaQueryDemo() {
  const [query, setQuery] = useState('(min-width: 768px)');
  const isMatch = useMediaQuery(query);

  const presets = [
    { label: 'Desktop (>=768px)', q: '(min-width: 768px)' },
    { label: 'Mobile (<768px)', q: '(max-width: 767px)' },
    { label: 'Dark Mode', q: '(prefers-color-scheme: dark)' },
  ];

  return (
    <div className="use-media-query-demo">
      <div className="use-media-query-demo__header">
        <h1 className="use-media-query-demo__title">useMediaQuery Hook Demo</h1>
        <p className="use-media-query-demo__description">Type a media query or pick a preset to see live match updates.</p>
      </div>

      <div className="use-media-query-demo__controls">
        <label className="use-media-query-demo__label" htmlFor="mq-input">Media Query</label>
        <input
          id="mq-input"
          className="use-media-query-demo__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="use-media-query-demo__presets">
          {presets.map((p) => (
            <button
              key={p.q}
              className={`use-media-query-demo__preset ${query === p.q ? 'use-media-query-demo__preset--active' : ''}`}
              onClick={() => setQuery(p.q)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="use-media-query-demo__status">
        <div className={`use-media-query-demo__badge ${isMatch ? 'use-media-query-demo__badge--match' : 'use-media-query-demo__badge--no-match'}`}>
          {isMatch ? 'Matches' : 'No match'}
        </div>
        <div className="use-media-query-demo__sample">
          <div className={`use-media-query-demo__box ${isMatch ? 'use-media-query-demo__box--on' : 'use-media-query-demo__box--off'}`}>
            {isMatch ? 'Active' : 'Inactive'}
          </div>
        </div>
      </div>

      <section className="use-media-query-demo__code">
        <h2 className="use-media-query-demo__code-title">Usage</h2>
        <pre className="use-media-query-demo__code-block">
{`const isDesktop = useMediaQuery('(min-width: 768px)');

// isDesktop will be true when viewport width is 768px or greater`}
        </pre>
      </section>
    </div>
  );
}

export { UseMediaQueryDemo };