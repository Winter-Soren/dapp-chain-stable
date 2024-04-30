import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, Stack, IconButton, Modal, Button, Divider, Tooltip, Zoom } from '@mui/material';
import { fShortenNumber } from 'src/utils/format-number';
import Iconify from 'src/components/iconify';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function CpuCard({ title, subheader, cpuObject, ...other }) {
	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

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
				<Box>
				<Tooltip
						title='CPU Details'
						placement='right'
						color='grey.500'
						arrow
						TransitionComponent={Zoom}
					>
					<IconButton
						aria-label='more-info'
						onClick={handleOpenModal}
					>
						<MoreVertIcon />
					</IconButton>
				</Tooltip>
				</Box>
			</Stack>
			{cpuObject && (
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
						&#160;
					</Typography>
				</Stack>
			)}

			<Box
				sx={{
					p: 3,
					gap: 2,
					display: 'grid',
					gridTemplateColumns: `repeat(${cpuObject?.currentLoadData.cpus.length / 5 || 2}, 1fr)`
				}}
			>
				{cpuObject?.currentLoadData.cpus.map((cpu, index) => (
					<Paper
						key={index}
						variant='outlined'
						sx={{
							py: 2.5,
							textAlign: 'center',
							borderStyle: 'dashed',
							borderColor: cpu.load < 40 ? 'green' : cpu.load < 70 ? 'orange' : 'red'
						}}
					>
						<Box sx={{ mb: 0.5 }}>
							<Iconify
								icon='tabler:cpu'
								color={cpu.load < 40 ? 'green' : cpu.load < 70 ? 'orange' : 'red'}
								width={32}
							/>
						</Box>
						<Typography
							variant='h6'
							sx={{ color: cpu.load < 40 ? 'text.primary' : cpu.load < 70 ? 'orange' : 'red' }}
						>
							{fShortenNumber(cpu.load)}%
						</Typography>
						<Typography
							variant='body2'
							sx={{ color: cpu.load < 40 ? 'green' : cpu.load < 70 ? 'orange' : 'red' }}
						>
							Core {index + 1} {cpu.load < 40 ? 'is idle' : cpu.load < 70 ? 'is in use' : 'is overloaded'}
						</Typography>
					</Paper>
				))}
			</Box>

			<Modal
				open={openModal}
				onClose={handleCloseModal}
			>
				<Paper
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
						borderRadius: 4
					}}
				>
					<Typography
						variant='h6'
						gutterBottom
					>
						CPU Details
					</Typography>
					<Typography>Manufacturer: {cpuObject?.cpuData.manufacturer}</Typography>
					<Divider sx={{ my: 1 }} />
					<Typography>Brand: {cpuObject?.cpuData.brand}</Typography>
					<Divider sx={{ my: 1 }} />
					<Typography>Performance Cores: {cpuObject?.cpuData.performanceCores}</Typography>
					<Divider sx={{ my: 1 }} />
					<Typography>Physical Cores: {cpuObject?.cpuData.physicalCores}</Typography>
					<Divider sx={{ my: 1 }} />
					<Typography>Frequency: {cpuObject?.cpuData.speed} GHz</Typography>
					<Divider sx={{ my: 1 }} />
					<Typography>Virtualization: {cpuObject?.cpuData.virtualization ? 'Active' : 'Off'}</Typography>

					<Button
						onClick={handleCloseModal}
						color='error'
						sx={{ mt: 2 }}
					>
						Close Modal
					</Button>
				</Paper>
			</Modal>
		</Card>
	);
}

CpuCard.propTypes = {
	title: PropTypes.string,
	subheader: PropTypes.string,
	cpuObject: PropTypes.object.isRequired
};
