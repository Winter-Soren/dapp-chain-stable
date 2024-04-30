import { Helmet } from 'react-helmet-async';

import { MyNFTsView } from 'src/sections/my-nfts/view';

// ----------------------------------------------------------------------

export default function MyNFTs() {
	return (
		<>
			<Helmet>
				<title> My NFTs | Minimal UI </title>
			</Helmet>

			<MyNFTsView />
		</>
	);
}
