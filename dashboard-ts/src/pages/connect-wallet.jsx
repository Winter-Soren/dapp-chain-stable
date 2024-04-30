import { Helmet } from 'react-helmet-async';

import { ConnectWalletView } from 'src/sections/connect-wallet/view';

// ----------------------------------------------------------------------

export default function ConnetWallet() {
	return (
		<>
			<Helmet>
				<title> Connect Wallet | Minimal UI </title>
			</Helmet>

			<ConnectWalletView />
		</>
	);
}
