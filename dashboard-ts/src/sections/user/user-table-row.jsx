import { useState } from 'react';
import PropTypes from 'prop-types';

import { Stack, Avatar, Popover, TableRow, Checkbox, MenuItem, TableCell, Typography, IconButton } from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({ selected, name, avatarUrl, company, role, isVerified, status, handleClick }) {
	const [open, setOpen] = useState(null);

	const handleOpenMenu = event => {
		setOpen(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpen(null);
	};

	return (
		<>
			<TableRow
				hover
				tabIndex={-1}
				role='checkbox'
				selected={selected}
			>
				<TableCell padding='checkbox'>
					<Checkbox
						disableRipple
						checked={selected}
						onChange={handleClick}
					/>
				</TableCell>

				<TableCell
					component='th'
					scope='row'
					padding='none'
				>
					<Stack
						direction='row'
						alignItems='center'
						spacing={2}
					>
						<Avatar
							alt={name}
							src={avatarUrl}
						/>
						<Typography
							variant='subtitle2'
							noWrap
						>
							{name}
						</Typography>
					</Stack>
				</TableCell>

				<TableCell>{company}</TableCell>

				<TableCell>{role}</TableCell>

				<TableCell align='center'>{isVerified ? 'Yes' : 'No'}</TableCell>

				<TableCell>
					<Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
				</TableCell>

				<TableCell align='right'>
					<IconButton onClick={handleOpenMenu}>
						<Iconify icon='eva:more-vertical-fill' />
					</IconButton>
				</TableCell>
			</TableRow>

			<Popover
				open={!!open}
				anchorEl={open}
				onClose={handleCloseMenu}
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				PaperProps={{
					sx: { width: 140 }
				}}
			>
				<MenuItem onClick={handleCloseMenu}>
					<Iconify
						icon='eva:edit-fill'
						sx={{ mr: 2 }}
					/>
					Edit
				</MenuItem>

				<MenuItem
					onClick={handleCloseMenu}
					sx={{ color: 'error.main' }}
				>
					<Iconify
						icon='eva:trash-2-outline'
						sx={{ mr: 2 }}
					/>
					Delete
				</MenuItem>
			</Popover>
		</>
	);
}

UserTableRow.propTypes = {
	avatarUrl: PropTypes.any,
	company: PropTypes.any,
	handleClick: PropTypes.func,
	isVerified: PropTypes.any,
	name: PropTypes.any,
	role: PropTypes.any,
	selected: PropTypes.any,
	status: PropTypes.string
};
