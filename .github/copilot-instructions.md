# React Hooks Demo Project - AI Coding Guidelines

## Project Overview
This is a React + Vite project showcasing custom React hooks with interactive demos. Each hook is demonstrated through a dedicated component with visual feedback and real-time state management.

## Architecture Patterns

### Custom Hooks Structure (`src/hooks/`)
- **Export Pattern**: Hooks export named exports, not default exports
- **Error Handling**: All hooks include validation and throw descriptive errors for invalid inputs
- **State Management**: Use `useReducer` for complex state (e.g., `useFetch`), `useState` for simple state
- **Cleanup**: Always implement cleanup for side effects (timers, fetch abort controllers)

### Demo Components (`src/examples/`)
Each demo follows this structure:
```
ComponentName/
  ├── ComponentName.jsx    # Main component
  └── ComponentName.css    # BEM-style CSS
```

### BEM CSS Methodology
All components use strict BEM naming:
- Block: `.component-name`
- Element: `.component-name__element`
- Modifier: `.component-name--modifier`

Example from `FetchDemo.css`:
```css
.fetch-demo__button--primary
.fetch-demo__status-loading
.fetch-demo__data-item
```

## Key Implementation Patterns

### useFetch Hook Pattern
- Uses `useReducer` with status constants (`STATUS.IDLE`, `STATUS.LOADING`, etc.)
- Implements abort controller for request cancellation
- Returns state + `refetch` function + `STATUS` constants
- Manual triggering (no auto-fetch on mount) - controlled by components

### Error Boundaries & Validation
Every custom hook validates inputs and throws meaningful errors:
```javascript
if (!key || typeof key !== 'string') {
    throw new Error('useLocalStorage: key must be a non-empty string');
}
```

### State Visual Indicators
Components provide real-time visual feedback using CSS classes based on state:
- Loading spinners
- Progress bars (debounce delay visualization)
- Success/error indicators
- State-specific styling

## Development Workflow

### React Compiler Integration
- Uses `babel-plugin-react-compiler` for optimization
- Affects Vite dev/build performance
- Memoization handled by compiler, avoid manual `useMemo` unless necessary

### Component Development
1. Create hook in `src/hooks/` with proper exports
2. Add hook export to `src/hooks/index.js`
3. Create demo component in `src/examples/ComponentName/`
4. Import and uncomment in `App.jsx` for testing
5. Use BEM CSS methodology for styling

### Scripts
- `npm run dev` - Development server with HMR
- `npm run build` - Production build
- `npm run lint` - ESLint validation

## Code Style Guidelines

### Import Organization
```javascript
// React imports first
import React from 'react';
// Custom hooks
import { useFetch } from '../../hooks/useFetch';
// Styles last
import './ComponentName.css';
```

### State Management in Demos
- Use controlled components with local state
- Separate display state from hook state
- Provide clear visual feedback for all states
- Include counters/metrics where relevant (API calls, keystrokes)

### API Integration
- Use real APIs for demos (dummyjson.com)
- Implement proper error handling and loading states
- Show request/response data in user-friendly format
- Include request cancellation patterns

## File Naming Conventions
- Hooks: `useHookName.js` (camelCase)
- Components: `ComponentName.jsx` (PascalCase)  
- Styles: `ComponentName.css` (PascalCase matching component)
- Exports: Named exports preferred over default exports

## Testing Patterns
- Each demo component serves as a live test
- Include edge cases in demo interactions (empty inputs, network errors)
- Provide clear visual feedback for all hook states
- Use real-world scenarios in examples