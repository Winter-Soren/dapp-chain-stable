import { useState } from 'react';
import { Slide, Input, Button, styled, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';
import { bgBlur } from 'src/theme/css';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
	...bgBlur({
		color: theme.palette.background.default
	}),
	top: 0,
	left: 0,
	zIndex: 99,
	width: '100%',
	display: 'flex',
	position: 'absolute',
	alignItems: 'center',
	height: HEADER_MOBILE,
	padding: theme.spacing(0, 3),
	boxShadow: theme.customShadows.z8,
	[theme.breakpoints.up('md')]: {
		height: HEADER_DESKTOP,
		padding: theme.spacing(0, 5)
	}
}));

// ----------------------------------------------------------------------
const searchables = [
	{
		name: 'People',
		icon: 'eva:people-fill',
		path: '/dashboard/people'
	},
	{
		name: 'Documents',
		icon: 'eva:file-text-fill',
		path: '/dashboard/documents'
	},
	{
		name: 'Discussions',
		icon: 'eva:message-square-fill',
		path: '/dashboard/discussions'
	},
	{
		name: 'Communities',
		icon: 'eva:share-fill'
	},
	{
		name: 'Events',
		icon: 'eva:calendar-fill'
	},
	{
		name: 'Files',
		icon: 'eva:briefcase-fill'
	}
];

export default function Searchbar() {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(!open);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<ClickAwayListener onClickAway={handleClose}>
			<div>
				{!open && (
					<IconButton onClick={handleOpen}>
						<Iconify icon='eva:search-fill' />
					</IconButton>
				)}

				<Slide
					direction='down'
					in={open}
					mountOnEnter
					unmountOnExit
				>
					<StyledSearchbar>
						<Input
							autoFocus
							fullWidth
							disableUnderline
							placeholder='Search…'
							startAdornment={
								<InputAdornment position='start'>
									<Iconify
										icon='eva:search-fill'
										sx={{ color: 'text.disabled', width: 20, height: 20 }}
									/>
								</InputAdornment>
							}
							sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
						/>
						<Button
							variant='contained'
							onClick={handleClose}
						>
							Search
						</Button>
					</StyledSearchbar>
				</Slide>
			</div>
		</ClickAwayListener>
	);
}