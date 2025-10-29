
import { useState } from 'react';

function useLocalStorage(key, initialValue) {
    if (!key || typeof key !== 'string') {
        throw new Error('useLocalStorage: key must be a non-empty string');
    }

    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            if (item === null) {
                // Save initial value to localStorage if not present
                window.localStorage.setItem(key, JSON.stringify(initialValue));
                return initialValue;
            }
            return JSON.parse(item);
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            setStoredValue((currentValue) => {
                const valueToStore = value instanceof Function ? value(currentValue) : value;
                
                // Save to localStorage
                if (typeof window !== 'undefined') {
                    if (valueToStore === undefined) {
                        window.localStorage.removeItem(key);
                    } else {
                        window.localStorage.setItem(key, JSON.stringify(valueToStore));
                    }
                }
                
                return valueToStore;
            });
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    // Remove function - React Compiler will optimize if needed
    const removeValue = () => {
        try {
            setStoredValue(initialValue);
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
            }
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue, removeValue];
}

export { useLocalStorage };