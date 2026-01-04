import { useRef } from 'react';
import { useHover } from '../../hooks/useHover';
import './UseHoverDemo.css';

function UseHoverDemo() {
    // Simple mode - using callback ref pattern
    const [isHoveredSimple,hoverRef] = useHover();
    
    // Advanced mode - using useRef pattern
    const cardRef = useRef(null);
    const isHoveredAdvanced = useHover(cardRef);

    return (
        <div className="use-hover-demo">
            <div className="use-hover-demo__header">
                <h2 className="use-hover-demo__title">🐭 useHover Demo</h2>
                <div className="use-hover-demo__divider"></div>
            </div>

            <div className="use-hover-demo__content">
                <div className="use-hover-demo__section">
                    <h3 className="use-hover-demo__section-title">Simple Mode</h3>
                    <div 
                        ref={hoverRef}
                        className="use-hover-demo__card use-hover-demo__card--simple"
                    >
                        <div className="use-hover-demo__card-content">
                            <div className="use-hover-demo__card-area">Card Area</div>
                            <div className="use-hover-demo__status">
                                Hovered: <span className={`use-hover-demo__value ${isHoveredSimple ? 'use-hover-demo__value--active' : ''}`}>
                                    {isHoveredSimple ? 'true' : 'false'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="use-hover-demo__description">
                        Uses callback ref pattern: <code>const [hoverRef, isHovered] = useHover()</code>
                    </p>
                </div>

                <div className="use-hover-demo__section">
                    <h3 className="use-hover-demo__section-title">Advanced</h3>
                    <div 
                        ref={cardRef}
                        className={`use-hover-demo__card use-hover-demo__card--advanced ${isHoveredAdvanced ? 'use-hover-demo__card--hovered' : ''}`}
                    >
                        <div className="use-hover-demo__card-content">
                            <div className="use-hover-demo__card-title">Card</div>
                            <div className="use-hover-demo__status">
                                {isHoveredAdvanced ? 'Hovered' : 'Not Hovered'}
                            </div>
                        </div>
                    </div>
                    <p className="use-hover-demo__description">
                        Uses useRef pattern: <code>const isHovered = useHover(cardRef)</code>
                    </p>
                </div>
            </div>

            <div className="use-hover-demo__footer">
                <div className="use-hover-demo__divider"></div>
                <p className="use-hover-demo__note">
                    Hover over the cards to see the hook in action!
                </p>
            </div>

            <section className="use-hover-demo__code">
                <h2 className="use-hover-demo__code-title">Usage Example</h2>
                <pre className="use-hover-demo__code-block">
                    <code>{`// Method 1: Callback ref pattern
const [isHovered, hoverRef] = useHover();
<div ref={hoverRef}>
  Hovered: {isHovered ? 'true' : 'false'}
</div>

// Method 2: useRef pattern
const cardRef = useRef(null);
const isHovered = useHover(cardRef);
<div ref={cardRef}>
  {isHovered && <span>Hovering!</span>}
</div>`}</code>
                </pre>
            </section>
        </div>
    );
}

export { UseHoverDemo };