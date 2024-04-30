import { Helmet } from 'react-helmet-async';

import { MarketplaceView } from 'src/sections/marketplace/view';

// ----------------------------------------------------------------------

export default function Marketplace() {
	return (
		<>
			<Helmet>
				<title> Marketplace | Minimal UI </title>
			</Helmet>

			<MarketplaceView />
		</>
	);
}
