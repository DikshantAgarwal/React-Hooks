import React, { useState } from 'react';
import { useWindowResize } from '../../hooks/useWindowResize';
import './UseWindowResizeDemo.css';

const UseWindowResizeDemo = () => {
    const { width, height, isMobileView, isTabletView, isDesktopView } = useWindowResize();
    
    // Example with custom breakpoints
    const customBreakpoints = { mobile: 480, tablet: 768, desktop: 1200 };
    const { 
        width: customWidth, 
        isMobileView: customIsMobile,
        isTabletView: customIsTablet,
        isDesktopView: customIsDesktop
    } = useWindowResize(customBreakpoints, { debounceMS: 300 });

    const [resizeCount, setResizeCount] = useState(0);

    // Track resize events
    React.useEffect(() => {
        setResizeCount(prev => prev + 1);
    }, [width]);

    const getDeviceType = () => {
        if (isMobileView) return 'Mobile';
        if (isTabletView) return 'Tablet';
        if (isDesktopView) return 'Desktop';
        return 'Unknown';
    };

    const getCustomDeviceType = () => {
        if (customIsMobile) return 'Mobile';
        if (customIsTablet) return 'Tablet';
        if (customIsDesktop) return 'Desktop';
        return 'Unknown';
    };

    return (
        <div className="use-window-resize-demo">
            <div className="use-window-resize-demo__header">
                <h1 className="use-window-resize-demo__title">useWindowResize Hook Demo</h1>
                <p className="use-window-resize-demo__description">
                    Track window dimensions and responsive breakpoints with debouncing for optimal performance.
                </p>
            </div>

            <div className="use-window-resize-demo__content">
                {/* Current Window Size */}
                <section className="use-window-resize-demo__section">
                    <h2 className="use-window-resize-demo__section-title">
                        Current Window Size
                    </h2>
                    <div className="use-window-resize-demo__size-display">
                        <div className="use-window-resize-demo__dimension">
                            <span className="use-window-resize-demo__dimension-label">Width:</span>
                            <span className="use-window-resize-demo__dimension-value">{width}px</span>
                        </div>
                        <div className="use-window-resize-demo__dimension">
                            <span className="use-window-resize-demo__dimension-label">Height:</span>
                            <span className="use-window-resize-demo__dimension-value">{height}px</span>
                        </div>
                        <div className="use-window-resize-demo__dimension">
                            <span className="use-window-resize-demo__dimension-label">Resize Count:</span>
                            <span className="use-window-resize-demo__dimension-value use-window-resize-demo__dimension-value--highlight">
                                {resizeCount}
                            </span>
                        </div>
                    </div>
                    <p className="use-window-resize-demo__hint">
                        👆 Resize your browser window to see values update (debounced at 150ms)
                    </p>
                </section>

                {/* Breakpoint Detection */}
                <section className="use-window-resize-demo__section">
                    <h2 className="use-window-resize-demo__section-title">
                        Default Breakpoint Detection
                    </h2>
                    <div className="use-window-resize-demo__breakpoints">
                        <div className={`use-window-resize-demo__breakpoint ${isMobileView ? 'use-window-resize-demo__breakpoint--active' : ''}`}>
                            <div className="use-window-resize-demo__breakpoint-icon">📱</div>
                            <div className="use-window-resize-demo__breakpoint-name">Mobile</div>
                            <div className="use-window-resize-demo__breakpoint-range">&lt; 600px</div>
                            <div className="use-window-resize-demo__breakpoint-status">
                                {isMobileView ? '✓ Active' : 'Inactive'}
                            </div>
                        </div>
                        <div className={`use-window-resize-demo__breakpoint ${isTabletView ? 'use-window-resize-demo__breakpoint--active' : ''}`}>
                            <div className="use-window-resize-demo__breakpoint-icon">📱</div>
                            <div className="use-window-resize-demo__breakpoint-name">Tablet</div>
                            <div className="use-window-resize-demo__breakpoint-range">600px - 1023px</div>
                            <div className="use-window-resize-demo__breakpoint-status">
                                {isTabletView ? '✓ Active' : 'Inactive'}
                            </div>
                        </div>
                        <div className={`use-window-resize-demo__breakpoint ${isDesktopView ? 'use-window-resize-demo__breakpoint--active' : ''}`}>
                            <div className="use-window-resize-demo__breakpoint-icon">💻</div>
                            <div className="use-window-resize-demo__breakpoint-name">Desktop</div>
                            <div className="use-window-resize-demo__breakpoint-range">≥ 1024px</div>
                            <div className="use-window-resize-demo__breakpoint-status">
                                {isDesktopView ? '✓ Active' : 'Inactive'}
                            </div>
                        </div>
                    </div>
                    <div className="use-window-resize-demo__current-device">
                        Current Device Type: <strong>{getDeviceType()}</strong>
                    </div>
                </section>

                {/* Custom Breakpoints Example */}
                <section className="use-window-resize-demo__section use-window-resize-demo__section--custom">
                    <h2 className="use-window-resize-demo__section-title">
                        Custom Breakpoints Example
                    </h2>
                    <p className="use-window-resize-demo__section-description">
                        This example uses custom breakpoints (480px, 768px, 1200px) with 300ms debounce
                    </p>
                    <div className="use-window-resize-demo__breakpoints">
                        <div className={`use-window-resize-demo__breakpoint use-window-resize-demo__breakpoint--small ${customIsMobile ? 'use-window-resize-demo__breakpoint--active' : ''}`}>
                            <div className="use-window-resize-demo__breakpoint-name">Mobile</div>
                            <div className="use-window-resize-demo__breakpoint-range">&lt; 480px</div>
                        </div>
                        <div className={`use-window-resize-demo__breakpoint use-window-resize-demo__breakpoint--small ${customIsTablet ? 'use-window-resize-demo__breakpoint--active' : ''}`}>
                            <div className="use-window-resize-demo__breakpoint-name">Tablet</div>
                            <div className="use-window-resize-demo__breakpoint-range">480px - 767px</div>
                        </div>
                        <div className={`use-window-resize-demo__breakpoint use-window-resize-demo__breakpoint--small ${customIsDesktop ? 'use-window-resize-demo__breakpoint--active' : ''}`}>
                            <div className="use-window-resize-demo__breakpoint-name">Desktop</div>
                            <div className="use-window-resize-demo__breakpoint-range">≥ 768px</div>
                        </div>
                    </div>
                    <div className="use-window-resize-demo__current-device">
                        Custom Device Type: <strong>{getCustomDeviceType()}</strong>
                    </div>
                </section>

                {/* Usage Examples */}
                <section className="use-window-resize-demo__code">
                    <h2 className="use-window-resize-demo__code-title">
                        Usage Examples
                    </h2>
                    
                    <div className="use-window-resize-demo__code-example">
                        <h3 className="use-window-resize-demo__code-subtitle">Basic Usage</h3>
                        <pre className="use-window-resize-demo__code-block">
                            <code>{`// Get window dimensions and breakpoints
const { width, height, isMobileView, isTabletView, isDesktopView } = useWindowResize();

// Use in your component
return (
  <div>
    {isMobileView && <MobileMenu />}
    {isDesktopView && <DesktopNav />}
  </div>
);`}</code>
                        </pre>
                    </div>

                    <div className="use-window-resize-demo__code-example">
                        <h3 className="use-window-resize-demo__code-subtitle">Custom Breakpoints</h3>
                        <pre className="use-window-resize-demo__code-block">
                            <code>{`// Define custom breakpoints
const customBreakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1200
};

const { width, isMobileView } = useWindowResize(customBreakpoints);`}</code>
                        </pre>
                    </div>

                    <div className="use-window-resize-demo__code-example">
                        <h3 className="use-window-resize-demo__code-subtitle">Custom Debounce Delay</h3>
                        <pre className="use-window-resize-demo__code-block">
                            <code>{`// Adjust debounce delay (default: 150ms)
const { width, height } = useWindowResize(
  {},
  { debounceMS: 300 }
);`}</code>
                        </pre>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UseWindowResizeDemo;