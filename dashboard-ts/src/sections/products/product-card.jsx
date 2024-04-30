import React from 'react';
import PropTypes from 'prop-types';
import { Card, Stack, Typography, Link, useTheme, Paper } from '@mui/material';

import Label from 'src/components/label';
import { useRouter } from 'src/routes/hooks';

export default function ShopProductCard({ blockData }) {
	const theme = useTheme();
	const route = useRouter();

	const renderStatus = blockData.result.timestamp
		? (new Date() - new Date(parseInt(blockData.result.timestamp, 16))) / 3600000 < 1 && (
				<Label
					variant='filled'
					color='error'
					sx={{
						zIndex: 9,
						top: 16,
						right: 16,
						position: 'absolute',
						textTransform: 'uppercase'
					}}
				>
					New
				</Label>
			)
		: null;

	const clipAddress = address => {
		if (!address) return '';
		if (address.length > 10) {
			const prefix = address.substring(0, 6);
			const suffix = address.slice(-4);
			return `${prefix}...${suffix}`;
		}
		return address;
	};

	return (
		<Paper
			elevation={3}
			sx={{ backgroundColor: parseInt(blockData.result.size, 16) >= 1000 ? theme.palette.error.light : theme.palette.primary.lighter, borderRadius: '8px', cursor: 'pointer' }}
			onClick={() => {
				route.push(`/product-detail/${blockData.result.hash}`);
			}}
		>
			<Stack
				spacing={2}
				sx={{ p: 3 }}
			>
				{renderStatus}
				<Typography
					variant='h6'
					sx={{ fontWeight: 'bold', marginBottom: 1 }}
				>
					Block #{blockData.id}
				</Typography>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
				>
					<Typography variant='body1'>Miner: {parseInt(blockData.result.miner, 16)}</Typography>
					<Typography variant='body1'>Size: {parseInt(blockData.result.size, 16)} bytes</Typography>
				</Stack>
				<Link
					color='primary'
					underline='hover'
					variant='subtitle1'
					noWrap
					onClick={() => {
						route.push(`/product-detail/${blockData.result.hash}`);
					}}
					sx={{ cursor: 'pointer' }}
				>
					{clipAddress(blockData.result.hash)}
				</Link>
				<Typography
					variant='body2'
					sx={{ fontStyle: 'italic' }}
				>
					Time: {new Date(parseInt(blockData.result.timestamp, 16)).toString()}
				</Typography>
			</Stack>
		</Paper>
	);
}

ShopProductCard.propTypes = {
	blockData: PropTypes.object.isRequired
};
