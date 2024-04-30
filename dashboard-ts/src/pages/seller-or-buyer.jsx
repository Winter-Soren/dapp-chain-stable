import { Helmet } from 'react-helmet-async';

import { SellerOrBuyerView } from 'src/sections/seller-or-buyer/view';

// ----------------------------------------------------------------------

export default function SellerOrBuyer() {
	return (
		<>
			<Helmet>
				<title> Are you Seller or Buyer </title>
			</Helmet>

			<SellerOrBuyerView />
		</>
	);
}
