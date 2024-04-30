import { Helmet } from 'react-helmet-async';

import { ProductDetailView } from 'src/sections/product-detail/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
	return (
		<>
			<Helmet>
				<title> Product Detail | Minimal UI </title>
			</Helmet>

			<ProductDetailView />
		</>
	);
}
