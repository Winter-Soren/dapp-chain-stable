import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Drawer, Button, Avatar, alpha, Typography, ListItemButton } from '@mui/material';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import { account } from 'src/_mock/account';
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { NAV } from './config-layout';
import navConfig from './config-navigation';
import { useWallet } from 'src/contexts/WalletContext';
import { generateAvatarURL } from '@cfx-kit/wallet-avatar';
import { useRouter } from 'src/routes/hooks';

import { useSetUser } from 'src/contexts/SellerOrBuyerContext';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
	const { wallet, disconnectMetaMask } = useWallet();
	const { account, isMetaMaskConnected } = wallet;
	const { sellerOrBuyer } = useSetUser();
	const pathname = usePathname();

	const upLg = useResponsive('up', 'lg');
	const router = useRouter();

	const clipAddress = address => {
		// address = toString(address)
		if (!address) return '';
		if (address.length > 10) {
			const prefix = address.substring(0, 6);
			const suffix = address.slice(-4);
			return `${prefix}...${suffix}`;
		}
		return address;
	};

	useEffect(() => {
		if (openNav) {
			onCloseNav();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const handleDisconnectWallet = () => {
		disconnectMetaMask();
		router.push('/connect');
	};

	const renderAccount = (
		<Box
			sx={{
				my: 3,
				mx: 2.5,
				py: 2,
				px: 2.5,
				display: 'flex',
				borderRadius: 1.5,
				alignItems: 'center',
				bgcolor: theme =>
					isMetaMaskConnected
						? alpha(theme.palette.success.main, 0.12)
						: alpha(theme.palette.error.main, 0.12)
			}}
		>
			<Avatar
				src={generateAvatarURL(toString(account))}
				alt='photoURL'
				sx={{ width: 37, height: 37, bgcolor: 'background.neutral' }}
			/>

			{isMetaMaskConnected ? (
				<Box sx={{ ml: 2 }}>
					<Typography variant='subtitle2'>{clipAddress(account)}</Typography>
					<Typography
						variant='body2'
						sx={{ color: 'success.main' }}
					>
						Connected
					</Typography>
				</Box>
			) : (
				<Box sx={{ ml: 2 }}>
					{/* <Typography variant='subtitle2'>{clipAddress(accounts[0])}</Typography> */}
					<Typography
						variant='body2'
						sx={{ color: 'error.main' }}
					>
						Disconnected
					</Typography>
				</Box>
			)}
		</Box>
	);
	const filteredNavConfig = navConfig.filter(item => {
		if (sellerOrBuyer.isSeller) {
			// If showCreateNft is true, include all items
			return true;
		} else {
			// If showCreateNft is false, exclude items with titles 'create nft' and 'my listings'
			return item.title !== 'create nft' && item.title !== 'my listings';
		}
	});
	const renderMenu = (
		<Stack
			component='nav'
			spacing={0.5}
			sx={{ px: 2 }}
		>
			{filteredNavConfig.map(item => (
				<NavItem
					key={item.title}
					item={item}
				/>
			))}
		</Stack>
	);

	const renderUpgrade = (
		<Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
			<Stack
				alignItems='center'
				spacing={3}
				sx={{ pt: 5, borderRadius: 2, position: 'relative' }}
			>
				<Box
					component='img'
					src='/assets/illustrations/illustration_avatar.png'
					sx={{ width: 100, position: 'absolute', top: -50 }}
				/>

				<Box sx={{ textAlign: 'center' }}>
					{sellerOrBuyer.isSeller ? (
						<Typography variant='h6'>I am Seller</Typography>
					) : (
						<Typography variant='h6'>I am Buyer</Typography>
					)}

					<Typography
						variant='body2'
						sx={{ color: 'text.secondary', mt: 1 }}
					>
						Tackle Counterfieting now
					</Typography>
				</Box>

				<Button
					// href="https://material-ui.com/store/items/minimal-dashboard/"
					// target="_blank"
					variant='contained'
					color='inherit'
					onClick={handleDisconnectWallet}
				>
					Disconnect wallet
				</Button>
			</Stack>
		</Box>
	);

	const renderContent = (
		<Scrollbar
			sx={{
				height: 1,
				'& .simplebar-content': {
					height: 1,
					display: 'flex',
					flexDirection: 'column'
				}
			}}
		>
			<Logo sx={{ mt: 3, ml: 4 }} />

			{renderAccount}

			{renderMenu}

			<Box sx={{ flexGrow: 1 }} />

			{renderUpgrade}
		</Scrollbar>
	);

	return (
		<Box
			sx={{
				flexShrink: { lg: 0 },
				width: { lg: NAV.WIDTH }
			}}
		>
			{upLg ? (
				<Box
					sx={{
						height: 1,
						position: 'fixed',
						width: NAV.WIDTH,
						borderRight: theme => `dashed 1px ${theme.palette.divider}`
					}}
				>
					{renderContent}
				</Box>
			) : (
				<Drawer
					open={openNav}
					onClose={onCloseNav}
					PaperProps={{
						sx: {
							width: NAV.WIDTH
						}
					}}
				>
					{renderContent}
				</Drawer>
			)}
		</Box>
	);
}

Nav.propTypes = {
	openNav: PropTypes.bool,
	onCloseNav: PropTypes.func
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
	const pathname = usePathname();

	const active = item.path === pathname;

	return (
		<ListItemButton
			component={RouterLink}
			href={item.path}
			sx={{
				minHeight: 44,
				borderRadius: 0.75,
				typography: 'body2',
				color: 'text.secondary',
				textTransform: 'capitalize',
				fontWeight: 'fontWeightMedium',
				...(active && {
					color: 'primary.main',
					fontWeight: 'fontWeightSemiBold',
					bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
					'&:hover': {
						bgcolor: theme => alpha(theme.palette.primary.main, 0.16)
					}
				})
			}}
		>
			<Box
				component='span'
				sx={{ width: 24, height: 24, mr: 2 }}
			>
				{item.icon}
			</Box>

			<Box component='span'>{item.title} </Box>
		</ListItemButton>
	);
}

NavItem.propTypes = {
	item: PropTypes.object
};
