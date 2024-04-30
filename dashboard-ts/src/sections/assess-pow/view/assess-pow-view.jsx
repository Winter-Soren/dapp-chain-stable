import React, { useEffect, useState } from 'react';
import { useInterval } from 'src/hooks/use-interval';
import axios from 'axios';
import CpuCard from '../cpu-card';
import MemoryCard from '../memory-card';
import TemperatureCard from '../temp-card';
import CarbonEmissionCard from '../carbon-emission-card';
import {
	Container,
	Stack,
	Grid,
	Typography,
	Button,
	TextField,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Box,
	Divider
} from '@mui/material';
import { MINING_URL, CARBON_URL } from '../../../constants';
import BarChart from './TempChart';
import LoadChart from './LoadChart';
import { useSnackbar } from 'notistack';
import { shuffleHash } from 'src/utils/shuffleHash';
import { formatTime } from 'src/utils/formatTime';
import { useLocalStorage } from 'src/hooks/use-local-storage';

const AssessPowView = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [startedMining, setStartedMining] = useState(false);
	const [realtimeCpuData, setRealtimeCpuData] = useState(undefined);
	const [carbonEmission, setCarbonEmission] = useLocalStorage('carbonEmission', undefined);
	const [appendCpuData, setAppendCpuData] = useState([]);
	// const [powData, setPowData] = useState([]);
	const [powData, setPowData] = useLocalStorage('powData', []);
	const [formValues, setFormValues] = useState({
		difficulty: 100,
		noOfBlocks: 4,
		instances: 1
	});

	const startMining = async () => {
		const headersList = {
			Accept: '*/*',
			'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
			'Content-Type': 'application/json'
		};
		const bodyContent = JSON.stringify(formValues);
		const reqOptions = {
			url: `${MINING_URL}/mine`,
			method: 'POST',
			headers: headersList,
			data: bodyContent
		};
		const response = await axios.request(reqOptions);
		setPowData(prev => [...prev, response.data]);
		setStartedMining(false);
		enqueueSnackbar('Mining has Ended', {
			variant: 'info'
		});

		// get the carbon emission
		await getCarbonEmission();

		// get the carbon data
		getCarbonData();
	};

	const getCarbonEmission = async () => {
		const headerList = {
			Accept: '*/*',
			'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
			'Content-Type': 'application/json'
		};

		const reqOptions = {
			url: `${CARBON_URL}/carbon-footprint`,
			method: 'GET',
			headers: headerList
		};
		console.log('fetching carbon data');
		const response = await axios.request(reqOptions);
		setCarbonEmission(response.data);
		console.log('carbon ffootrpint: ', response.data);
	};

	const getCarbonData = async () => {
		const headerList = {
			Accept: '*/*',
			'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
			'Content-Type': 'application/json'
		};

		const reqOptions = {
			url: `${CARBON_URL}/carbon-data`,
			method: 'GET',
			headers: headerList
		};

		const response = await axios.request(reqOptions);
		console.log('carbon data: ', response.data);
	};

	const terminateMining = async () => {
		const headersList = {
			Accept: '*/*',
			'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
			'Content-Type': 'application/json'
		};

		const reqOptions = {
			url: `${MINING_URL}/kill-mining`,
			method: 'POST',
			headers: headersList
		};

		const response = await axios.request(reqOptions);
		// console.log(response.data);
		setStartedMining(false);
		enqueueSnackbar('Your mining has been terminated', {
			variant: 'warning'
		});

		// append in powData
		{
			console.log('response.data:', response.data);
		}
		// console.log(powData);

		setPowData(prev => [
			...prev,
			[
				{
					blockNumber: formValues.noOfBlocks,
					difficulty: formValues.difficulty,
					timeTaken: 0,
					mixHash: 'Terminated'
				}
			]
		]);
	};

	useInterval(async () => {
		const reqOptions = {
			url: `${MINING_URL}/cpu`,
			method: 'GET',
			headers: {
				Accept: '*/*',
				'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
			}
		};
		const response = await axios.request(reqOptions);
		setRealtimeCpuData(response.data);
		// console.log('CPU Data:', response.data);
		setAppendCpuData(prev => [...prev, response.data]);
	}, 450);

	const handleSubmit = event => {
		event.preventDefault();
		try {
			// if the mining has already started
			if (startedMining) {
				terminateMining();
				return;
			}

			// console.log('Form submitted:', formValues);
			setStartedMining(true);
			startMining();
			enqueueSnackbar('Mining started', {
				variant: 'success'
			});
		} catch (error) {
			console.error('Error in form submission:', error);
			enqueueSnackbar('Error in init mining', {
				variant: 'error'
			});
		}
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setFormValues(prevValues => ({
			...prevValues,
			[name]: value
		}));
	};

	return (
		<Container>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				mb={5}
			>
				<Typography variant='h4'>Assess PoW Algorithm</Typography>
			</Stack>
			{startedMining && realtimeCpuData && (
				<Box>
					<img
						src='/assets/gif/mining.gif'
						alt=''
					/>
					<Typography gutterBottom>Mining in progress</Typography>
				</Box>
			)}
			<Paper sx={{ p: 4 }}>
				<Box sx={{ mb: 3, mt: -1 }}>
					<Typography variant='h5'>Enter the Details to Assess</Typography>
				</Box>
				<Grid container>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}
					>
						<Box sx={{ width: '80%' }}>
							<img
								src='/assets/background/mining.png'
								alt=''
							/>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}
					>
						<form onSubmit={handleSubmit}>
							{!startedMining ? (
								<Stack
									direction='column'
									spacing={3}
									mb={3}
								>
									<TextField
										label='Difficulty'
										type='number'
										name='difficulty'
										value={formValues.difficulty}
										onChange={handleChange}
										variant='outlined'
									/>
									<TextField
										label='Number of Blocks'
										type='number'
										name='noOfBlocks'
										value={formValues.noOfBlocks}
										onChange={handleChange}
										variant='outlined'
									/>
									<TextField
										label='Instances'
										type='number'
										name='instances'
										value={formValues.instances}
										onChange={handleChange}
										variant='outlined'
									/>
								</Stack>
							) : (
								<Stack
									spacing={1}
									sx={{ mb: 3 }}
								>
									<Typography>Mining Difficulty: {formValues.difficulty}</Typography>
									<Divider />
									<Typography>Number of blocks to Mine: {formValues.noOfBlocks}</Typography>
									<Divider />
									<Typography>Number of Instances to run: {formValues.instances}</Typography>
									<Divider />
								</Stack>
							)}

							{startedMining ? (
								<Button
									type='submit'
									variant='contained'
									color='warning'
								>
									Terminate Mining
								</Button>
							) : (
								<Button
									type='submit'
									variant='contained'
									color='primary'
								>
									Start Mining
								</Button>
							)}
						</form>
					</Grid>
				</Grid>
			</Paper>

			<Grid
				container
				spacing={2}
				mt={5}
			>
				<Grid
					item
					xs={12}
					md={12}
					lg={12}
				>
					<CpuCard
						title='CPU Cores'
						subheader='Utilization of CPU Cores during mining'
						cpuObject={realtimeCpuData}
					/>
				</Grid>

				<Grid
					item
					xs={12}
					md={12}
					lg={12}
				>
					<TemperatureCard
						title='Temperature Status'
						subheader='Temperature of CPU cores (physical cores) during mining'
						cpuObject={realtimeCpuData}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={12}
					lg={12}
				>
					<MemoryCard
						title='Memory Status'
						subheader='Utilization of Memory during mining'
						cpuObject={realtimeCpuData}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={12}
					lg={12}
					sx={{
						mb: 3
					}}
				>
					<CarbonEmissionCard
						title='Carbon Footprint'
						subheader='Emission of carbon during mining (kgCO2eq)'
						carbonObject={carbonEmission}
						refreshCarbonFootprintData={getCarbonEmission}
					/>
				</Grid>
			</Grid>

			{powData && (
				<>
					<Typography
						variant='h5'
						gutterBottom
					>
						CPU Temperature Data
					</Typography>
					{realtimeCpuData && <BarChart array={realtimeCpuData.cpuTemperatureData.cores} />}
				</>
			)}

			{powData && (
				<TableContainer component={Paper}>
					<Table
						sx={{ minWidth: 650 }}
						aria-label='simple table'
					>
						<TableHead>
							<TableRow>
								<TableCell>Block Number</TableCell>
								<TableCell>Difficulty</TableCell>
								<TableCell>Time Taken</TableCell>
								<TableCell>Mix Hash</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{powData.map((rows, index) =>
								rows.map((row, rowIndex) => (
									<TableRow
										key={index + '-' + rowIndex}
										sx={{
											backgroundColor: row.mixHash != 'Terminated' ? '#C8FAD6' : '#ffcccc'
										}}
									>
										<TableCell>{row.blockNumber}</TableCell>
										<TableCell>{row.difficulty}</TableCell>
										<TableCell>{formatTime(row.timeTaken)}</TableCell>
										<TableCell
											sx={{
												color: row.mixHash != 'Terminated' ? '' : '#ff0000'
											}}
										>
											{row.mixHash != 'Terminated'
												? shuffleHash(row.mixHash, index)
												: 'Terminated'}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};

export default AssessPowView;
