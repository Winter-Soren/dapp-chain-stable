import React, { useEffect, useState } from 'react';
import { Grid, Box, Skeleton, useTheme, Container, Typography } from '@mui/material';
import _ from 'lodash';
import AppWebsiteVisits from '../../overview/app-website-visits';
import AppWidgetSummary from '../../overview/app-widget-summary';
import { BACKEND_API_URL } from 'src/constants';
import { useInterval } from 'usehooks-ts';

const CpuMetricsView = () => {
	const theme = useTheme();
	const [recentTransaction, setRecentTransaction] = useState({});
	const [allTransactions, setAllTransactions] = useState([]);
	const [uniqueTransactions, setUniqueTransactions] = useState([]);
	const [cpuTempBlockDiffArr, setCpuTempBlockDiffArr] = useState({});
	const systemStatus = 'Synced';
	const chainId = 100;
	const noOfPeers = 2;
	const noOfBlocks = 59000;

	useInterval(() => {
		const backendApiUrl = BACKEND_API_URL;

		// get api to get the recent transaction
		fetch(backendApiUrl + 'get-recent-transactions/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(async response => await response.json())
			.then(data => {
				setRecentTransaction(data[0]);
				setAllTransactions(data);
				const uniqueTransactions = data.filter(
					(transaction, index, self) => index === self.findIndex(t => t.id === transaction.id)
				);
				setUniqueTransactions(uniqueTransactions);
				console.log('unique transactions', uniqueTransactions);
				console.log(data[0]);
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});

		fetch(backendApiUrl + 'get-cputemp-blockdifficulty/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(async response => await response.json())
			.then(data => {
				setCpuTempBlockDiffArr(data);
				console.log('cpu temp and block difficulty arr', cpuTempBlockDiffArr);
			});
	}, 1000);

	return (
		<Container maxWidth='xl'>
			<Typography
				variant='h4'
				sx={{ mb: 5 }}
			>
				CPU Metrics 👋
			</Typography>

			<Grid
				container
				spacing={3}
			>
				<Grid
					xs={12}
					sm={6}
					md={3}
				>
					{recentTransaction.cpu_temperature === null ? (
						<>
							<Skeleton
								variant='rectangular'
								width='100%'
								height='100%'
								sx={{
									borderRadius: '13px'
								}}
							/>
						</>
					) : (
						<>
							<AppWidgetSummary
								title='CPU Temperature'
								total={recentTransaction.cpu_temperature}
								color='success'
								icon={
									<img
										alt='icon'
										src='/assets/icons/glass/ic_glass_users.png'
									/>
								}
							/>
						</>
					)}
				</Grid>

				<Grid
					xs={12}
					sm={6}
					md={3}
				>
					{recentTransaction.created_at === null ? (
						<>
							<Skeleton
								variant='rectangular'
								width='100%'
								height='100%'
								sx={{
									borderRadius: '13px'
								}}
							/>
						</>
					) : (
						<>
							<AppWidgetSummary
								title='Created At'
								total={new Date(recentTransaction.created_at).toString().split('GMT')[0]}
								color='info'
								icon={
									<img
										alt='icon'
										src='/assets/icons/glass/ic_glass_bag.png'
									/>
								}
							/>
						</>
					)}
				</Grid>

				<Grid
					xs={12}
					sm={6}
					md={3}
				>
					{!recentTransaction.ram_usage ? (
						<>
							<Skeleton
								variant='rectangular'
								width='100%'
								height='100%'
								sx={{
									borderRadius: '13px'
								}}
							/>
						</>
					) : (
						<>
							<AppWidgetSummary
								title='RAM Usage'
								total={recentTransaction.ram_usage}
								color='warning'
								icon={
									<img
										alt='icon'
										src='/assets/icons/glass/ic_glass_buy.png'
									/>
								}
							/>
						</>
					)}
				</Grid>

				<Grid
					xs={12}
					sm={6}
					md={3}
				>
					{recentTransaction.transaction_type === null ? (
						<>
							<Skeleton
								variant='rectangular'
								width='100%'
								height='100%'
								sx={{
									borderRadius: '13px'
								}}
							/>
						</>
					) : (
						<>
							<AppWidgetSummary
								title='Txn Type'
								total={recentTransaction.transaction_type}
								color={recentTransaction.transaction_type ? 'success' : 'error'}
								sx={{
									backgroundColor: recentTransaction.transaction_type
										? theme.palette.success.lighter
										: theme.palette.error.lighter,
									borderColor: recentTransaction.transaction_type
										? theme.palette.success.light
										: theme.palette.error.light,
									borderWidth: '1px',
									borderStyle: 'dashed'
								}}
								icon={
									<img
										alt='icon'
										src='/assets/icons/glass/ic_glass_message.png'
									/>
								}
							/>
						</>
					)}
				</Grid>

				<Grid
					item
					xs={12}
					md={6}
					lg={8}
				>
					<AppWebsiteVisits
						title='Block Difficulty vs CPU Temperature'
						subheader='Each block difficulty vs CPU temperature per transaction'
						chart={{
							labels: cpuTempBlockDiffArr.cpu_temperature_arr, // Assuming you have a 'blockDifficulty' property in your transaction object
							series: [
								{
									name: 'Bar',
									type: 'column',
									fill: 'solid',
									data: cpuTempBlockDiffArr.block_difficulty_arr
								},
								{
									name: 'Line',
									type: 'area',
									fill: 'gradient',
									data: cpuTempBlockDiffArr.block_difficulty_arr
								}
							]
						}}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default CpuMetricsView;
