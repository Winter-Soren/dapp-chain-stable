import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from 'src/hooks/use-local-storage';

export const SellerOrBuyerContext = createContext({
	sellerOrBuyer: {
		isSeller: true
	},
	updateSellerOrBuyer: () => {}
});

export function SellerOrBuyerContextProvider({ children }) {
	const [sellerOrBuyer, setSellerOrBuyer] = useLocalStorage('sellerOrBuyer', {
		sellerOrBuyer: {
			isSeller: true
		}
	});

	const updateSellerOrBuyer = newSellerOrBuyer => {
		setSellerOrBuyer(prevSellerOrBuyer => ({
			...prevSellerOrBuyer,
			...newSellerOrBuyer
		}));
	};

	const SellerOrBuyerContextProps = {
		sellerOrBuyer,
		updateSellerOrBuyer
	};

	return <SellerOrBuyerContext.Provider value={SellerOrBuyerContextProps}>{children}</SellerOrBuyerContext.Provider>;
}

export function useSetUser() {
	const context = useContext(SellerOrBuyerContext);
	if (!context) {
		throw new Error('useSetUser must be used within a SellerOrBuyerContextProvider');
	}
	return context;
}
