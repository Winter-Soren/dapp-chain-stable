import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader } from '@mui/material';
import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function AppTrafficBySite({ title, subheader, list, icon, value, ...other }) {
	return (
		<Card {...other}>
			<CardHeader
				title={title}
				subheader={subheader}
			/>

			<Box
				sx={{
					p: 3,
					gap: 2,
					display: 'grid',
					gridTemplateColumns: 'repeat(2, 1fr)'
				}}
			>
				{list.map(site => (
					<Paper
						key={site.name}
						variant='outlined'
						sx={{ py: 2.5, textAlign: 'center', borderStyle: 'dashed' }}
					>
						<Box sx={{ mb: 0.5 }}>{site.icon}</Box>

						<Typography variant='h6'>{fShortenNumber(site.value)}</Typography>

						<Typography
							variant='body2'
							sx={{ color: 'text.secondary' }}
						>
							{site.name}
						</Typography>
					</Paper>
				))}
			</Box>
		</Card>
	);
}

AppTrafficBySite.propTypes = {
	title: PropTypes.string,
	subheader: PropTypes.string,
	list: PropTypes.array.isRequired
};
