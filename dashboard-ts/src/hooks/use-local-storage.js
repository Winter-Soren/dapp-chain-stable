import { useCallback, useEffect, useState } from 'react';

import { useEventCallback, useEventListener } from 'usehooks-ts';

window.EventMap = window.EventMap || {};
window.EventMap['local-storage'] = CustomEvent;

export function useLocalStorage(key, initialValue) {
	const readValue = useCallback(() => {
		if (typeof window === 'undefined') {
			return initialValue;
		}

		try {
			const item = window.localStorage.getItem(key);
			return item ? parseJSON(item) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	}, [initialValue, key]);

	const [storedValue, setStoredValue] = useState(readValue);

	const setValue = useEventCallback(value => {
		if (typeof window === 'undefined') {
			console.warn(`Tried setting localStorage key "${key}" even though the environment is not a client`);
		}

		try {
			const newValue = value instanceof Function ? value(storedValue) : value;
			window.localStorage.setItem(key, JSON.stringify(newValue));
			setStoredValue(newValue);
			window.dispatchEvent(new Event('local-storage'));
		} catch (error) {
			console.warn(`Error setting localStorage key "${key}":`, error);
		}
	});

	useEffect(() => {
		setStoredValue(readValue());
	}, []);

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
	useEventListener('local-storage', handleStorageChange);

	return [storedValue, setValue];
}

function parseJSON(value) {
	try {
		return value === 'undefined' ? undefined : JSON.parse(value || '');
	} catch {
		console.log('parsing error on', { value });
		return undefined;
	}
}
