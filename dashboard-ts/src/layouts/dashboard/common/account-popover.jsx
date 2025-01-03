import { useState } from 'react';
import { Box, Avatar, Divider, Popover, alpha, MenuItem, Typography, IconButton } from '@mui/material';
import { account } from 'src/_mock/account';
import { useWallet } from 'src/contexts/WalletContext';
import { generateAvatarURL } from '@cfx-kit/wallet-avatar';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
	{
		label: 'Home',
		icon: 'eva:home-fill'
	},
	{
		label: 'Profile',
		icon: 'eva:person-fill'
	},
	{
		label: 'Settings',
		icon: 'eva:settings-2-fill'
	}
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
	const { wallet } = useWallet();
	const { account } = wallet;

	const [open, setOpen] = useState(null);

	const handleOpen = event => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(null);
	};

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

	return (
		<>
			<IconButton
				onClick={handleOpen}
				sx={{
					width: 40,
					height: 40,
					background: theme => alpha(theme.palette.grey[500], 0.08),
					...(open && {
						background: theme =>
							`linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`
					})
				}}
			>
				<Avatar
					src={generateAvatarURL(toString(account))}
					// alt={account.displayName}
					sx={{
						width: 36,
						height: 36,
						border: theme => `solid 2px ${theme.palette.background.default}`
					}}
				>
					{/* {account.displayName.charAt(0).toUpperCase()} */}
				</Avatar>
			</IconButton>

			<Popover
				open={!!open}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				PaperProps={{
					sx: {
						p: 0,
						mt: 1,
						ml: 0.75,
						width: 200
					}
				}}
			>
				<Box sx={{ my: 1.5, px: 2 }}>
					{/* {account} */}
					<Typography
						variant='subtitle2'
						noWrap
					>
						{clipAddress(account)}
					</Typography>
					<Typography
						variant='body2'
						sx={{ color: 'text.secondary' }}
						noWrap
					>
						{account.email}
					</Typography>
				</Box>

				<Divider sx={{ borderStyle: 'dashed' }} />

				{MENU_OPTIONS.map(option => (
					<MenuItem
						key={option.label}
						onClick={handleClose}
					>
						{option.label}
					</MenuItem>
				))}

				<Divider sx={{ borderStyle: 'dashed', m: 0 }} />

				<MenuItem
					disableRipple
					disableTouchRipple
					onClick={handleClose}
					sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
				>
					Logout
				</MenuItem>
			</Popover>
		</>
	);
}
