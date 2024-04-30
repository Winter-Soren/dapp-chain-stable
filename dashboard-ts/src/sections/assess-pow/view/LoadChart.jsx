import React from 'react';
import Chart from 'react-apexcharts';

const PercentageChart = ({ array }) => {
	// Calculate total sum of the array
	const totalSum = array.reduce((acc, curr) => acc + curr, 0);

	// Convert each number into percentage
	const percentages = array.map(number => (number / totalSum) * 100);

	// Prepare data for ApexCharts
	const series = [
		{
			name: 'Percentage',
			data: percentages
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
			categories: array.map((_, index) => `Value ${index + 1}`)
		},
		yaxis: {
			title: {
				text: 'Percentage'
			}
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return val.toFixed(2) + '%';
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

export default PercentageChart;
