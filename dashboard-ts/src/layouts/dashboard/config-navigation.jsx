import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = name => (
	<SvgColor
		src={`/assets/icons/navbar/${name}.svg`}
		sx={{ width: 1, height: 1 }}
	/>
);

const navConfig = [
	{
		title: 'dashboard',
		path: '/',
		icon: icon('ic_analytics')
	},
	{
		title: 'blocks',
		path: '/blocks',
		icon: icon('ic_cart')
	},
	{
		title: 'create nft',
		path: '/create-nft',
		icon: icon('ic_user')
	},
	{
		title: 'my listings',
		path: '/my-listings',
		icon: icon('ic_user')
	},
	{
		title: 'marketplace',
		path: '/marketplace',
		icon: icon('ic_cart')
	},
	{
		title: 'my nfts',
		path: '/my-nfts',
		icon: icon('ic_cart')
	},
	{
		title: 'assess pow',
		path: '/assess-pow',
		icon: icon('ic_analytics')
	}
];

export default navConfig;
