
import { useRef, useState, useCallback } from 'react';
import { useEventListener } from '../../hooks/useEventListener';
import './UseEventListenerDemo.css';

function UseEventListenerDemo() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [lastKey, setLastKey] = useState('');
    const [clickCount, setClickCount] = useState(0);
    const [hoverCount, setHoverCount] = useState(0);
    const [scrollCount, setScrollCount] = useState(0);
    
    const buttonRef = useRef(null);
    const [callbackRefElement, setCallbackRefElement] = useState(null);

    // Window resize listener
    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth);
    }, []);

    // Key press listener
    const handleKeyPress = useCallback((event) => {
        setLastKey(event.key.toUpperCase());
    }, []);

    // Button click listener
    const handleButtonClick = useCallback(() => {
        setClickCount(prev => prev + 1);
    }, []);

    // Hover listener for callback ref example
    const handleMouseEnter = useCallback(() => {
        setHoverCount(prev => prev + 1);
    }, []);

    // Scroll listener for hook-returned ref
    const handleScroll = useCallback(() => {
        setScrollCount(prev => prev + 1);
    }, []);

    // Callback ref function
    const callbackRef = useCallback((element) => {
        setCallbackRefElement(element);
    }, []);

    // Use event listeners
    useEventListener('resize', handleResize, window);
    useEventListener('keydown', handleKeyPress, document);
    useEventListener('click', handleButtonClick, buttonRef);
    useEventListener('mouseenter', handleMouseEnter, callbackRefElement);
    const scrollRef = useEventListener('scroll', handleScroll);

    return (
        <div className="event-listener-demo">
            <div className="event-listener-demo__header">
                <h2 className="event-listener-demo__title">useEventListener Demo</h2>
                <div className="event-listener-demo__divider"></div>
            </div>

            <div className="event-listener-demo__content">
                <div className="event-listener-demo__section">
                    <h3 className="event-listener-demo__section-title">[ Window Resize Listener ]</h3>
                    <p className="event-listener-demo__info">
                        Window width: <span className="event-listener-demo__value">{windowWidth}px</span>
                    </p>
                </div>

                <div className="event-listener-demo__section">
                    <h3 className="event-listener-demo__section-title">[ Key Press Listener ]</h3>
                    <p className="event-listener-demo__info">
                        Last key pressed: <span className="event-listener-demo__value">{lastKey || 'None'}</span>
                    </p>
                    <p className="event-listener-demo__hint">Press any key to see it here</p>
                </div>

                <div className="event-listener-demo__section">
                    <h3 className="event-listener-demo__section-title">[ Element Listener ]</h3>
                    <button 
                        ref={buttonRef}
                        className="event-listener-demo__button"
                    >
                        Click Me
                    </button>
                    <p className="event-listener-demo__info">
                        Button clicked: <span className="event-listener-demo__value">{clickCount} times</span>
                    </p>
                </div>

                <div className="event-listener-demo__section">
                    <h3 className="event-listener-demo__section-title">[ Callback Ref Listener ]</h3>
                    <div 
                        ref={callbackRef}
                        className="event-listener-demo__hover-box"
                    >
                        Hover over this box!
                    </div>
                    <p className="event-listener-demo__info">
                        Hover count: <span className="event-listener-demo__value">{hoverCount} times</span>
                    </p>
                    <p className="event-listener-demo__hint">This uses a callback ref instead of useRef</p>
                </div>

                <div className="event-listener-demo__section">
                    <h3 className="event-listener-demo__section-title">[ Hook Returns callback Ref ]</h3>
                    <div 
                        ref={scrollRef}
                        className="event-listener-demo__scroll-box"
                    >
                        <div className="event-listener-demo__scroll-content">
                            Scroll inside this container!
                            <br /><br />
                            This uses the existing useEventListener hook.
                            <br /><br />
                            Keep scrolling to increment the counter...
                            <br /><br />
                            More content here to make scrolling possible.
                            <br /><br />
                            Almost there!
                            <br /><br />
                            You can scroll up and down.
                        </div>
                    </div>
                    <p className="event-listener-demo__info">
                        Scroll count: <span className="event-listener-demo__value">{scrollCount} times</span>
                    </p>
                    <p className="event-listener-demo__hint">Using useEventListener directly without any target</p>
                </div>
            </div>

            <div className="event-listener-demo__footer">
                <div className="event-listener-demo__divider"></div>
            </div>
        </div>
    );
}

export { UseEventListenerDemo };