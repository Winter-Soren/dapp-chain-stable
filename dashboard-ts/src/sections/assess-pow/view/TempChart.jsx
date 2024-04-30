import React from 'react';
import Chart from 'react-apexcharts';

const ArrayChart = ({ array }) => {
	// Extract x values (index) and y values (array elements)
	const xValues = array.map((_, index) => index);
	const yValues = array;

	// Prepare data for ApexCharts
	const series = [
		{
			name: 'Array Values',
			data: yValues
		}
	];

	const options = {
		chart: {
			height: 350,
			type: 'bar'
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%',
				endingShape: 'rounded'
			}
		},
		dataLabels: {
			enabled: false
		},
		xaxis: {
			categories: xValues
		},
		yaxis: {
			title: {
				text: 'Values'
			}
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return val;
				}
			}
		}
	};

	return (
		<div>
			<Chart
				options={options}
				series={series}
				type='bar'
				height={350}
			/>
		</div>
	);
};

export default ArrayChart;
