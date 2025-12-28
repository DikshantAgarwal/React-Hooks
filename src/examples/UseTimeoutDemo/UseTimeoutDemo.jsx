import React, { useState } from 'react';
import { useTimeOut, useInterval } from '../../hooks';
import './UseTimeoutDemo.css';

function UseTimeoutDemo() {
  const [delayInput, setDelayInput] = useState(2000);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [lastRun, setLastRun] = useState(null);

  const { reset, clear } = useTimeOut(
    () => {
      setCount((c) => c + 1);
      setLastRun(new Date().toLocaleTimeString());
      setRunning(false);
    },
    running ? Number(delayInput) : null
  );

  const [intervalDelayInput, setIntervalDelayInput] = useState(1000);
  const [intervalRunning, setIntervalRunning] = useState(false);
  const [intCount, setIntCount] = useState(0);
  const [intLastRun, setIntLastRun] = useState(null);

  const { pause, resume } = useInterval(
    () => {
      setIntCount((c) => c + 1);
      setIntLastRun(new Date().toLocaleTimeString());
    },
    intervalRunning ? Number(intervalDelayInput) : null
  );

  return (
    <div className="use-timeout-demo">
      <div className="use-timeout-demo__header">
        <h1 className="use-timeout-demo__title">useTimeOut Hook Demo</h1>
        <p className="use-timeout-demo__description">A small demo showing start / cancel / reset behavior of the <code>useTimeOut</code> hook.</p>
      </div>

      <div className="use-timeout-demo__controls">
        <label className="use-timeout-demo__label" htmlFor="delay">Delay (ms)</label>
        <input
          id="delay"
          type="number"
          min="0"
          className="use-timeout-demo__input"
          value={delayInput}
          onChange={(e) => setDelayInput(e.target.value)}
        />

        <div className="use-timeout-demo__buttons">
          <button className="use-timeout-demo__button" onClick={() => setRunning(true)}>Start</button>
          <button className="use-timeout-demo__button" onClick={() => { clear(); setRunning(false); }}>Cancel</button>
          <button className="use-timeout-demo__button" onClick={() => { reset(); setRunning(true); }}>Reset</button>
          <button className="use-timeout-demo__button use-timeout-demo__button--small" onClick={() => { setCount(c => c + 1); }}>Trigger Now</button>
        </div>

        <div className="use-timeout-demo__meta">
          <div><strong>Scheduled:</strong> {running ? `Yes — ${delayInput}ms` : 'No'}</div>
          <div><strong>Times fired:</strong> {count}</div>
          <div><strong>Last run:</strong> {lastRun ?? '—'}</div>
        </div>
      </div>

      <section className="use-timeout-demo__code">
        <h2 className="use-timeout-demo__code-title">useTimeOut Usage</h2>
        <pre className="use-timeout-demo__code-block">
{`const { reset, clear } = useTimeOut(() => handleTimeout(), delay);

// set delay to null to disable automatic scheduling
// call reset() to re-schedule the timeout
// call clear() to cancel the current timeout`}
        </pre>
      </section>

      <hr className="use-timeout-demo__divider" />

      <div className="use-timeout-demo__header">
        <h2 className="use-timeout-demo__title">useInterval Hook Demo</h2>
        <p className="use-timeout-demo__description">Start / Pause / Resume a repeating interval with <code>useInterval</code>.</p>
      </div>

      <div className="use-timeout-demo__controls">
        <label className="use-timeout-demo__label" htmlFor="intervalDelay">Interval (ms)</label>
        <input
          id="intervalDelay"
          type="number"
          min="0"
          className="use-timeout-demo__input"
          value={intervalDelayInput}
          onChange={(e) => setIntervalDelayInput(e.target.value)}
        />

        <div className="use-timeout-demo__buttons">
          <button className="use-timeout-demo__button" onClick={() => setIntervalRunning(true)}>Start</button>
          <button className="use-timeout-demo__button" onClick={() => { pause(); setIntervalRunning(false); }}>Pause</button>
          <button className="use-timeout-demo__button" onClick={() => { resume(); setIntervalRunning(true); }}>Resume</button>
          <button className="use-timeout-demo__button" onClick={() => { pause(); setIntervalRunning(false); }}>Stop</button>
          <button className="use-timeout-demo__button use-timeout-demo__button--small" onClick={() => { setIntCount(c => c + 1); setIntLastRun(new Date().toLocaleTimeString()); }}>Trigger Now</button>
        </div>

        <div className="use-timeout-demo__meta">
          <div><strong>Running:</strong> {intervalRunning ? `Yes — ${intervalDelayInput}ms` : 'No'}</div>
          <div><strong>Times fired:</strong> {intCount}</div>
          <div><strong>Last run:</strong> {intLastRun ?? '—'}</div>
        </div>
      </div>

      <section className="use-timeout-demo__code">
        <h2 className="use-timeout-demo__code-title">useInterval Usage</h2>
        <pre className="use-timeout-demo__code-block">
{`const { pause, resume } = useInterval(() => handleTick(), delay);

// set delay to null to disable automatic scheduling
// call pause() to stop the interval
// call resume() to restart the interval`}
        </pre>
      </section>
    </div>
  );
}

export { UseTimeoutDemo };
