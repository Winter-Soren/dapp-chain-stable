import PropTypes from 'prop-types';
import { Box, Card, CardHeader } from '@mui/material';
import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits({ title, subheader, chart, ...other }) {
	const { labels, colors, series, options } = chart;

	const chartOptions = useChart({
		colors,
		plotOptions: {
			bar: {
				columnWidth: '16%'
			}
		},
		fill: {
			type: series.map(i => i.fill)
		},
		labels,
		xaxis: {
			type: 'datetime'
		},
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: value => {
					if (typeof value !== 'undefined') {
						return `${value.toFixed(0)} Difficulty`;
					}
					return value;
				}
			}
		},
		...options
	});

	return (
		<Card {...other}>
			<CardHeader
				title={title}
				subheader={subheader}
			/>

			<Box sx={{ p: 3, pb: 1 }}>
				<Chart
					dir='ltr'
					type='line'
					series={series}
					options={chartOptions}
					width='100%'
					height={364}
				/>
			</Box>
		</Card>
	);
}

AppWebsiteVisits.propTypes = {
	chart: PropTypes.object,
	subheader: PropTypes.string,
	title: PropTypes.string
};
