import React, { createContext, useContext, useState } from 'react';

export const CPUTempContext = createContext({
	cpuTemp: '',
	updateCPUTemp: () => {}
});

export function CPUTempContextProvider({ children }) {
	const [cpuTemp, setCPUTemp] = useState('');

	const updateCPUTemp = newCPUTemp => {
		setCPUTemp(prevCPUTemp => ({
			...prevCPUTemp,
			...newCPUTemp
		}));
	};

	const CPUTempContextProps = {
		cpuTemp,
		updateCPUTemp
	};

	return <CPUTempContext.Provider value={CPUTempContextProps}>{children}</CPUTempContext.Provider>;
}

export function useCPUTemp() {
	const context = useContext(CPUTempContext);
	if (!context) {
		throw new Error('useCPUTemp must be used within a CPUTempContextProvider');
	}
	return context;
}
