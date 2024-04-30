import { useWallet } from '../contexts/WalletContext';
import React, { useEffect } from 'react';
import { useRouter } from 'src/routes/hooks';

const PrivateRoute = ({ element }) => {
	const { wallet } = useWallet();
	const { isMetaMaskConnected } = wallet;
	const router = useRouter();

	useEffect(() => {
		if (isMetaMaskConnected == false) {
			router.push('/connect');
		}
	}, [isMetaMaskConnected]);

	return isMetaMaskConnected ? element : null;
	// return element;
};

export default PrivateRoute;
