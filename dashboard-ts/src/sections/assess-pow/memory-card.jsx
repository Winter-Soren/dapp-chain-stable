import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, Stack, IconButton, Modal, Button, Divider } from '@mui/material';
import { fShortenNumber, convertBittoGb } from 'src/utils/format-number';
import Iconify from 'src/components/iconify';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function MemoryCard({ title, subheader, cpuObject, ...other }) {
	let memUsedPercentage = 0;
	let swapUsedPercentage = 0;

	if (cpuObject && cpuObject.memory) {
		// console.log(cpuObject.memory);
		memUsedPercentage = (cpuObject.memory.used / cpuObject.memory.total) * 100;
		if (cpuObject.memory.swaptotal !== 0) {
			swapUsedPercentage = (cpuObject.memory.swapused / cpuObject.memory.swaptotal) * 100;
		}
	}

	return (
		<Card {...other}>
			<Stack
				direction={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<CardHeader
					title={title}
					subheader={subheader}
				/>
			</Stack>
			{cpuObject && cpuObject.memory && (
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					sx={{ mb: 2, ml: 3 }}
				>
					<Typography
						variant='body2'
						sx={{ color: 'text.secondary' }}
					>
						Total Memory is {Math.round(convertBittoGb(cpuObject.memory.total))} GB ie.{' '}
						{convertBittoGb(cpuObject.memory.total).toFixed(2)} GB
					</Typography>
				</Stack>
			)}

			<Box sx={{ p: 3, gap: 2, display: 'grid', gridTemplateColumns: `repeat(2, 1fr)` }}>
				<Paper
					variant='outlined'
					sx={{
						py: 2.5,
						textAlign: 'center',
						borderStyle: 'dashed',
						borderColor: memUsedPercentage < 40 ? 'green' : memUsedPercentage < 70 ? 'orange' : 'red'
					}}
				>
					<Box sx={{ mb: 0.5 }}>
						<Iconify
							icon='fa-solid:memory'
							width={32}
							color={memUsedPercentage < 40 ? 'green' : memUsedPercentage < 70 ? 'orange' : 'red'}
						/>
					</Box>
					<Typography
						variant='h6'
						sx={{ color: memUsedPercentage < 40 ? 'green' : memUsedPercentage < 70 ? 'orange' : 'red' }}
					>
						{memUsedPercentage.toFixed(2)}%
					</Typography>
					<Typography
						variant='body2'
						sx={{ color: memUsedPercentage < 40 ? 'green' : memUsedPercentage < 70 ? 'orange' : 'red' }}
					>
						{memUsedPercentage < 40
							? 'Memory is underutilized'
							: memUsedPercentage < 70
								? 'Memory is moderately utilized'
								: 'Memory is heavily utilized'}
					</Typography>
				</Paper>
				<Paper
					variant='outlined'
					sx={{
						py: 2.5,
						textAlign: 'center',
						borderStyle: 'dashed',
						borderColor: swapUsedPercentage < 40 ? 'green' : swapUsedPercentage < 70 ? 'orange' : 'red'
					}}
				>
					<Box sx={{ mb: 0.5 }}>
						<Iconify
							icon='ph:swap-duotone'
							width={32}
							color={swapUsedPercentage < 40 ? 'green' : swapUsedPercentage < 70 ? 'orange' : 'red'}
						/>
					</Box>
					<Typography
						variant='h6'
						sx={{ color: swapUsedPercentage < 40 ? 'green' : swapUsedPercentage < 70 ? 'orange' : 'red' }}
					>
						{swapUsedPercentage.toFixed(2)}%
					</Typography>
					<Typography
						variant='body2'
						sx={{ color: swapUsedPercentage < 40 ? 'green' : swapUsedPercentage < 70 ? 'orange' : 'red' }}
					>
						{swapUsedPercentage === 0
							? 'No Swap Space used'
							: swapUsedPercentage < 40
								? 'Swap Space is underutilized'
								: swapUsedPercentage < 70
									? 'Swap Space is moderately utilized'
									: 'Swap Space is heavily utilized'}
					</Typography>
				</Paper>
			</Box>
		</Card>
	);
}
