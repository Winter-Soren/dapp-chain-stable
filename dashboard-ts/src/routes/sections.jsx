import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import DashboardLayout from 'src/layouts/dashboard';
import SuspenseLoader from 'src/components/suspence-loader';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const ConnectPage = lazy(() => import('src/pages/connect-wallet'));
export const CpuMetrics = lazy(() => import('src/pages/cpu-metrics'));
export const AssessPow = lazy(() => import('src/pages/assess-pow'));
export const UserPage = lazy(() => import('src/pages/user'));
export const MintNFT = lazy(() => import('src/pages/mint-nft'));
export const Marketplace = lazy(() => import('src/pages/marketplace'));
export const MyNFTs = lazy(() => import('src/pages/my-nfts'));
export const MyListings = lazy(() => import('src/pages/my-listings'));
export const SellerOrBuyer = lazy(() => import('src/pages/seller-or-buyer'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProductDetailPage = lazy(() => import('src/pages/product-detail'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ------------------------------------------------------------------------------

export default function Router() {
	const routes = useRoutes([
		{
			path: '/connect',
			element: <ConnectPage />
		},
		{
			path: '/seller-or-buyer',
			element: <SellerOrBuyer />
		},
		{
			path: '/buyer-or-seller',
			element: (
				<Navigate
					to='/seller-or-buyer'
					replace
				/>
			)
		},
		{
			element: (
				<PrivateRoute
					element={
						<DashboardLayout>
							<Suspense fallback={<SuspenseLoader />}>
								<Outlet />
							</Suspense>
						</DashboardLayout>
					}
				/>
			),
			children: [
				{ element: <IndexPage />, index: true },
				{ path: 'user', element: <UserPage /> },
				{ path: 'blocks', element: <ProductsPage /> },
				{
					path: 'product-detail/:hash',
					element: <ProductDetailPage />
				},
				{ path: 'blog', element: <BlogPage /> },
				{
					path: 'create-nft',
					element: <MintNFT />
				},
				{
					path: 'marketplace',
					element: <Marketplace />
				},
				{
					path: 'my-nfts',
					element: <MyNFTs />
				},
				{
					path: 'my-listings',
					element: <MyListings />
				},
				{
					path: 'cpu-metrics',
					element: <CpuMetrics />
				},
				{
					path: 'assess-pow',
					element: <AssessPow />
				}
			]
		},
		{
			path: 'login',
			element: <LoginPage />
		},
		{
			path: '404',
			element: <Page404 />
		},
		{
			path: '*',
			element: (
				<Navigate
					to='/404'
					replace
				/>
			)
		}
	]);

	return routes;
}
