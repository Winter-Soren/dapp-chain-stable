import { useState, useEffect, useCallback } from 'react';
import { useEventCallback, useEventListener } from 'usehooks-ts';

function parseJSON(value) {
	try {
		return JSON.parse(value);
	} catch (error) {
		return value;
	}
}

function useSessionStorage(key, initialValue) {
	const readValue = useCallback(() => {
		if (typeof window === 'undefined') {
			return initialValue;
		}

		try {
			const item = window.sessionStorage.getItem(key);
			return item ? parseJSON(item) : initialValue;
		} catch (error) {
			console.warn(`Error reading sessionStorage key "${key}":`, error);
			return initialValue;
		}
	}, [initialValue, key]);

	const [storedValue, setStoredValue] = useState(readValue);

	const setValue = useEventCallback(value => {
		if (typeof window === 'undefined') {
			console.warn(`Tried setting sessionStorage key "${key}" even though environment is not a client`);
		}

		try {
			const newValue = value instanceof Function ? value(storedValue) : value;
			window.sessionStorage.setItem(key, JSON.stringify(newValue));
			setStoredValue(newValue);
			window.dispatchEvent(new Event('session-storage'));
		} catch (error) {
			console.warn(`Error setting sessionStorage key "${key}":`, error);
		}
	});

	useEffect(() => {
		setStoredValue(readValue());
	}, [key]);

	const handleStorageChange = useCallback(
		event => {
			if (event.key && event.key !== key) {
				return;
			}
			setStoredValue(readValue());
		},
		[key, readValue]
	);

	useEventListener('storage', handleStorageChange);
	useEventListener('session-storage', handleStorageChange);

	return [storedValue, setValue];
}

export default useSessionStorage;
