import React, { useState, createContext, useContext } from 'react';

const ChainDetailsContext = createContext({
	chainDetails: {
		blockDifficulty: 0,
		blockNumber: 0
	},
	updateChainDetails: () => {}
});

export function ChainDetailsProvider({ children }) {
	const [chainDetails, setChainDetails] = useState({
		blockDifficulty: 0,
		blockNumber: 0
	});

	const updateChainDetails = newChainDetails => {
		setChainDetails(prevChainDetails => ({
			...prevChainDetails,
			...newChainDetails
		}));
	};

	const ChainDetailsContextProps = {
		chainDetails,
		updateChainDetails
	};

	return <ChainDetailsContext.Provider value={ChainDetailsContextProps}>{children}</ChainDetailsContext.Provider>;
}

export function useChainDetails() {
	const context = useContext(ChainDetailsContext);
	if (!context) {
		throw new Error('useChainDetails must be used within a ChainDetailsProvider');
	}
	return context;
}
