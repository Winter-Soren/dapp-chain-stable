import { Box, Card, Paper, Typography, CardHeader, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify';
import { fShortenNumber } from 'src/utils/format-number';

export default function TemperatureCard({ title, subheader, cpuObject, ...other }) {
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
					gridTemplateColumns: `repeat(${cpuObject?.cpuTemperatureData.cores.length / 3}, 1fr)`
				}}
			>
				{cpuObject?.cpuTemperatureData.cores.map((coreTemp, index) => (
					<Paper
						key={index}
						variant='outlined'
						sx={{
							py: 2.5,
							textAlign: 'center',
							borderStyle: 'dashed',
							borderColor: coreTemp < 40 ? 'blue' : coreTemp < 70 ? 'orange' : 'red'
						}}
					>
						<Box sx={{ mb: 0.5 }}>
							<Iconify
								icon='fluent:temperature-16-regular'
								color={coreTemp < 40 ? 'blue' : coreTemp < 70 ? 'orange' : 'red'}
								width={32}
							/>
						</Box>
						<Typography
							variant='h6'
							sx={{ color: coreTemp < 40 ? 'text.primary' : coreTemp < 70 ? 'orange' : 'red' }}
						>
							{fShortenNumber(coreTemp)}°C
						</Typography>
						<Typography variant='body2'>
							Core {index + 1} {coreTemp < 40 ? 'is cool' : coreTemp < 70 ? 'is warm' : 'is too hot'}
						</Typography>
					</Paper>
				))}
			</Box>
		</Card>
	);
}

TemperatureCard.propTypes = {
	title: PropTypes.string,
	subheader: PropTypes.string,
	cpuObject: PropTypes.object.isRequired
};
