import React, { useState, useRef } from 'react';
import { useClickOutside } from '../../hooks';
import './UseClickOutsideDemo.css';

function UseClickOutsideDemo() {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [outsideClickCount, setOutsideClickCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalClickCount, setModalClickCount] = useState(0);
  
  // Example 1: Using with useRef
  const boxRef = useRef(null);
  
 useClickOutside(boxRef,() => {
    setOutsideClickCount(prev => prev + 1);
    setIsBoxVisible(false);
  });

  // Example 2: Using with callback ref (dynamic node)
  const modalCallbackRef = useClickOutside(null, () => {
    setModalClickCount(prev => prev + 1);
    setIsModalVisible(false);
  }, { enabled: isModalVisible });

  const handleShowBox = (e) => {
    console.log("Showing box");
     e.stopPropagation();
    setIsBoxVisible(true);
    setOutsideClickCount(0);
  };

  const handleShowModal = (e) => {
       e.stopPropagation();
    setIsModalVisible(true);
    setModalClickCount(0);
  };

  return (
    <div className="use-click-outside-demo">
      <div className="use-click-outside-demo__header">
        <h1 className="use-click-outside-demo__title">useClickOutside Hook Demo</h1>
        <p className="use-click-outside-demo__description">
          Detects clicks outside of a target element and triggers a callback. 
          Useful for modals, dropdowns, and tooltips.
        </p>
      </div>

      <div className="use-click-outside-demo__content">
        {/* Example 1: Ref-based approach */}
        <section className="use-click-outside-demo__section">
          <h2 className="use-click-outside-demo__section-title">
            Example 1: Using with useRef
          </h2>
          
          <button 
            className="use-click-outside-demo__button"
            onClick={handleShowBox}
            disabled={isBoxVisible}
          >
            {isBoxVisible ? 'Box is Visible' : 'Show Box'}
          </button>

          {isBoxVisible && (
            <div 
              ref={boxRef}
              className="use-click-outside-demo__panel"
            >
              <div className="use-click-outside-demo__panel-header">
                <h3 className="use-click-outside-demo__panel-title">
                  I'm a Panel
                </h3>
                <button 
                  className="use-click-outside-demo__panel-close"
                  onClick={() => setIsBoxVisible(false)}
                  aria-label="Close panel"
                >
                  ✕
                </button>
              </div>
              <p className="use-click-outside-demo__panel-text">
                Click anywhere outside this panel to close it.
              </p>
              <div className="use-click-outside-demo__panel-counter">
                <span className="use-click-outside-demo__panel-counter-label">
                  Outside clicks:
                </span>
                <span className="use-click-outside-demo__panel-counter-value">
                  {outsideClickCount}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Example 2: Callback ref approach */}
        <section className="use-click-outside-demo__section">
          <h2 className="use-click-outside-demo__section-title">
            Example 2: Using with Callback Ref
          </h2>
          
          <button 
            className="use-click-outside-demo__button use-click-outside-demo__button--secondary"
            onClick={handleShowModal}
            disabled={isModalVisible}
          >
            {isModalVisible ? 'Modal is Visible' : 'Show Modal'}
          </button>

          {isModalVisible && (
            <div className="use-click-outside-demo__modal-overlay">
              <div 
                ref={modalCallbackRef}
                className="use-click-outside-demo__modal"
              >
                <div className="use-click-outside-demo__modal-header">
                  <h3 className="use-click-outside-demo__modal-title">
                    I'm a Modal
                  </h3>
                  <button 
                    className="use-click-outside-demo__modal-close"
                    onClick={() => setIsModalVisible(false)}
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>
                <p className="use-click-outside-demo__modal-text">
                  Click outside this modal (on the overlay) to close it.
                </p>
                <div className="use-click-outside-demo__modal-counter">
                  <span className="use-click-outside-demo__modal-counter-label">
                    Outside clicks:
                  </span>
                  <span className="use-click-outside-demo__modal-counter-value">
                    {modalClickCount}
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Features section */}
        <section className="use-click-outside-demo__features">
          <h2 className="use-click-outside-demo__features-title">
            Hook Features
          </h2>
          <ul className="use-click-outside-demo__features-list">
            <li className="use-click-outside-demo__features-item">
              <strong>Ref or Callback Ref:</strong> Works with both useRef and callback refs
            </li>
            <li className="use-click-outside-demo__features-item">
              <strong>Enable/Disable:</strong> Control when the hook is active with the `enabled` option
            </li>
            <li className="use-click-outside-demo__features-item">
              <strong>Custom Events:</strong> Listen to custom events beyond just 'click' (e.g., 'mousedown', 'touchstart')
            </li>
            <li className="use-click-outside-demo__features-item">
              <strong>Automatic Cleanup:</strong> Event listeners are properly cleaned up when component unmounts
            </li>
          </ul>
        </section>

        {/* Usage example */}
        <section className="use-click-outside-demo__code">
          <h2 className="use-click-outside-demo__code-title">
            Usage Example
          </h2>
          <pre className="use-click-outside-demo__code-block">
            <code>{`// With useRef
const ref = useRef(null);
useClickOutside(ref, () => {
  console.log('Clicked outside!');
}, { enabled: true });

// With callback ref
const callbackRef = useClickOutside(null, () => {
  console.log('Clicked outside!');
});

return <div ref={callbackRef}>Content</div>;`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}

export  {UseClickOutsideDemo};