import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Card,
	Paper,
	Typography,
	CardHeader,
	Stack,
	IconButton,
	Modal,
	Button,
	Divider,
	CircularProgress,
	Tooltip,
	Zoom
} from '@mui/material';
import { fShortenNumber, convertBittoGb } from 'src/utils/format-number';
import Iconify from 'src/components/iconify';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { convertExponent } from 'src/utils/format-number';
import {
	EMISSION_FACTOR_FOR_CPU,
	EMISSION_FACTOR_FOR_RAM,
	EMISSION_FACTOR_FOR_GPU,
	TOTAL_EMISSION_FACTOR_FOR_STANDARD_DEVICES
} from 'src/constants';

export default function CarbonEmissionCard({ title, subheader, carbonObject, refreshCarbonFootprintData, ...other }) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(false); 
	}, [carbonObject]); 
	const handleRefresh = async () => {
		setLoading(true); 
		await refreshCarbonFootprintData();
		setLoading(false); 
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

				<Paper>
					<Tooltip
						title='Refresh'
						placement='right'
						color='grey.500'
						arrow
						TransitionComponent={Zoom}
					>
						<IconButton
							aria-label='delete'
							onClick={handleRefresh}
						>
							<Iconify
								icon='material-symbols:refresh'
								width={32}
								color='grey.dark'
							/>
						</IconButton>
					</Tooltip>
				</Paper>
			</Stack>

			{carbonObject && (<Box sx={{ p: 3, gap: 2, display: 'grid', gridTemplateColumns: `repeat(2, 1fr)` }}>
				{loading ? (
					<>
						<Paper
							variant='outlined'
							sx={{
								py: 2.5,
								textAlign: 'center',
								borderStyle: 'dashed',
								borderColor: 'grey.500'
							}}
						>
							<Box sx={{ mb: 0.5 }}>
								<Iconify
									icon='bi:pc-display-horizontal'
									width={32}
									color='primary.main'
								/>
							</Box>
							<Typography variant='h6'>
								<CircularProgress />
							</Typography>
							<Typography variant='body2'>Entire System kgCO2eq</Typography>
						</Paper>
						<Paper
							variant='outlined'
							sx={{
								py: 2.5,
								textAlign: 'center',
								borderStyle: 'dashed',
								borderColor: 'grey.500'
							}}
						>
							<Box sx={{ mb: 0.5 }}>
								<Iconify
									icon='tabler:cpu'
									width={32}
									color='primary.main'
								/>
							</Box>
							<Typography variant='h6'>
								<CircularProgress />
							</Typography>
							<Typography variant='body2'>CPU kgCO2eq</Typography>
						</Paper>
						<Paper
							variant='outlined'
							sx={{
								py: 2.5,
								textAlign: 'center',
								borderStyle: 'dashed',
								borderColor: 'grey.500'
							}}
						>
							<Box sx={{ mb: 0.5 }}>
								<Iconify
									icon='fa-solid:memory'
									width={32}
									color='primary.main'
								/>
							</Box>
							<Typography variant='h6'>
								<CircularProgress />
							</Typography>
							<Typography variant='body2'>RAM kgCO2eq</Typography>
						</Paper>
						<Paper
							variant='outlined'
							sx={{
								py: 2.5,
								textAlign: 'center',
								borderStyle: 'dashed',
								borderColor: 'grey.500'
							}}
						>
							<Box sx={{ mb: 0.5 }}>
								<Iconify
									icon='bi:gpu-card'
									width={32}
									color={'primary.main'}
								/>
							</Box>
							<Typography variant='h6'>
								<CircularProgress />
							</Typography>
							<Typography variant='body2'>GPU kgCO2eq</Typography>
						</Paper>
					</>
				) : (
					<>
						<Paper
							variant='outlined'
							sx={{
								py: 2.5,
								textAlign: 'center',
								borderStyle: 'dashed',
								borderColor: 'grey.500'
							}}
						>
							<Box sx={{ mb: 0.5 }}>
								<Iconify
									icon='bi:pc-display-horizontal'
									width={32}
									color='primary.main'
								/>
							</Box>
							<Typography variant='h6'>
								{convertExponent(
									carbonObject.final_emissions * TOTAL_EMISSION_FACTOR_FOR_STANDARD_DEVICES
								)}
								<sup>{carbonObject.final_emissions.toExponential().split('e')[1]}</sup>
							</Typography>
							<Typography variant='body2'>Entire System kgCO2eq</Typography>
						</Paper>
						<Paper
							variant='outlined'
							sx={{
								py: 2.5,
								textAlign: 'center',
								borderStyle: 'dashed',
								borderColor: 'grey.500'
							}}
						>
							<Box sx={{ mb: 0.5 }}>
								<Iconify
									icon='tabler:cpu'
									width={32}
									color='primary.main'
								/>
							</Box>
							<Typography variant='h6'>
								{convertExponent(
									carbonObject.final_emissions_data.cpu_energy * EMISSION_FACTOR_FOR_CPU
								)}
								<sup>{carbonObject.final_emissions_data.cpu_energy.toExponential().split('e')[1]}</sup>
							</Typography>
							<Typography variant='body2'>CPU kgCO2eq</Typography>
						</Paper>
						<Paper
							variant='outlined'
							sx={{
								py: 2.5,
								textAlign: 'center',
								borderStyle: 'dashed',
								borderColor: 'grey.500'
							}}
						>
							<Box sx={{ mb: 0.5 }}>
								<Iconify
									icon='fa-solid:memory'
									width={32}
									color='primary.main'
								/>
							</Box>
							<Typography variant='h6'>
								{convertExponent(
									carbonObject.final_emissions_data.ram_energy * EMISSION_FACTOR_FOR_RAM
								)}
								<sup>{carbonObject.final_emissions_data.ram_energy.toExponential().split('e')[1]}</sup>
							</Typography>
							<Typography variant='body2'>RAM kgCO2eq</Typography>
						</Paper>
						<Paper
							variant='outlined'
							sx={{
								py: 2.5,
								textAlign: 'center',
								borderStyle: 'dashed',
								borderColor: carbonObject.final_emissions_data.gpu_energy === 0 ? 'red' : 'primary.main'
							}}
						>
							<Box sx={{ mb: 0.5 }}>
								<Iconify
									icon='bi:gpu-card'
									width={32}
									color={
										carbonObject.final_emissions_data.gpu_energy === 0 ? '#FF5630' : 'primary.main'
									}
								/>
							</Box>
							<Typography variant='h6'>
								{convertExponent(
									carbonObject.final_emissions_data.gpu_energy * EMISSION_FACTOR_FOR_GPU
								)}
								{carbonObject.final_emissions_data.gpu_energy === 0 ? (
									<></>
								) : (
									<sup>
										{carbonObject.final_emissions_data.gpu_energy.toExponential().split('e')[1]}
									</sup>
								)}
							</Typography>
							<Typography variant='body2'>GPU kgCO2eq</Typography>
							<Typography
								variant='body2'
								color='error'
							>
								{carbonObject.final_emissions_data.gpu_energy === 0
									? 'No GPU detected'
									: `GPU: ${carbonObject.final_emissions_data.gpu_name}`}
							</Typography>
						</Paper>
					</>
				)}
			</Box>)}
		</Card>
	);
}

CarbonEmissionCard.propTypes = {
	title: PropTypes.string.isRequired,
	subheader: PropTypes.string.isRequired,
	carbonObject: PropTypes.object.isRequired,
	refreshCarbonFootprintData: PropTypes.func.isRequired
};
