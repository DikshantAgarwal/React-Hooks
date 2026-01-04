import React, { useRef, useState } from "react";
import { useScrollPosition } from "../../hooks/useScrollPosition";

// Full demo for `useScrollPosition` — shows window vs container target, debounce, direction, and controls
function UseScrollPositionDemo() {
  const containerRef = useRef(null);
  const [useWindow, setUseWindow] = useState(false);
  const [debounceMS, setDebounceMS] = useState(150);

  const target = useWindow ? undefined : containerRef;

  const { scrollX, scrollY, direction, backToTop } = useScrollPosition({ target, debounceMS });

  const scrollContainerTo = (top) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top, behavior: "smooth" });
  };

  const scrollWindowTo = (top) => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top, left: 0, behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 12 }}>
      <h3>useScrollPosition — interactive demo</h3>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
        <label>
          <input type="checkbox" checked={useWindow} onChange={(e) => setUseWindow(e.target.checked)} /> Use
          window as target
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span>debounceMS:</span>
          <input
            type="number"
            value={debounceMS}
            onChange={(e) => setDebounceMS(Number(e.target.value) || 0)}
            style={{ width: 80 }}
          />
        </label>

        <button onClick={() => (useWindow ? scrollWindowTo(0) : scrollContainerTo(0))}>Scroll to top</button>
        <button onClick={() => (useWindow ? scrollWindowTo(500) : scrollContainerTo(500))}>Scroll to 500</button>
      </div>

      <div style={{ marginBottom: 8 }}>
        <strong>Readouts:</strong> X: {scrollX} — Y: {scrollY} — Direction: {direction}
        <button style={{ marginLeft: 12 }} onClick={backToTop}>
          Back to top
        </button>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h4>Container target</h4>
          <div
            ref={containerRef}
            style={{ width: 320, height: 240, overflow: "auto", background: "#e8f5ff", padding: 12, borderRadius: 6 }}
          >
            {/* tall content to scroll */}
            <div style={{ height: 1200, lineHeight: "24px" }}>
              <p>Scroll this container to test the hook when target is a DOM element.</p>
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i}>Line {i + 1} — demo content</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h4>Window target</h4>
          <p>When "Use window as target" is checked, the hook reads window scroll position. Use the buttons above or scroll the page to test.</p>
          <div style={{ padding: 8, background: "#fcf3e6", borderRadius: 6 }}>
            <p style={{ margin: 0 }}>Tip: open the browser devtools and look for changes to X/Y/direction while interacting.</p>
          </div>
        </div>
      </div>

      <hr style={{ marginTop: 12 }} />

      <p style={{ marginTop: 8, color: "#666" }}>
        Notes: this demo passes a ref element for the container by default. Toggle "Use window as target" to attach the hook to the
        window. Adjust <code>debounceMS</code> to test different debounce settings (if the hook uses it).
      </p>

      {/* Usage Example */}
      <section className="use-scroll-position-demo__code">
        <h2 className="use-scroll-position-demo__code-title">Usage Example</h2>
        <pre className="use-scroll-position-demo__code-block">
          <code>{`// Track scroll position on an element
const containerRef = useRef(null);
const { scrollX, scrollY, direction, backToTop } = useScrollPosition({ target: containerRef, debounceMS: 150 });

// Track window instead
const { scrollY } = useScrollPosition({ target: undefined, debounceMS: 150 });

// Scroll programmatically
containerRef.current.scrollTo({ top: 500, behavior: 'smooth' });`}</code>
        </pre>
      </section>
    </div>
  );
}

export  {UseScrollPositionDemo};
