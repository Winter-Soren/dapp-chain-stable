import { Helmet } from 'react-helmet-async';

import { MyListingsView } from 'src/sections/my-listings/view';

// ----------------------------------------------------------------------

export default function MyListings() {
	return (
		<>
			<Helmet>
				<title> My Listings | Minimal UI </title>
			</Helmet>

			<MyListingsView />
		</>
	);
}
