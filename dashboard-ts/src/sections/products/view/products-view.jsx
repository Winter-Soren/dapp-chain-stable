import React, { useEffect, useState } from 'react';
import { Stack, Container, Grid, Typography, Pagination, useTheme, Box } from '@mui/material';
import { JSON_RPC_URL } from 'src/constants';
import { useRouter } from 'src/routes/hooks';
import { fShortenNumber } from 'src/utils/format-number';
import ProductCard from '../product-card';
import { useInterval } from 'src/hooks/use-interval';

export default function ProductsView() {
	const router = useRouter();
	const theme = useTheme();

	// State for the block number
	const [blockNumber, setBlockNumber] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 50; // Number of blocks to fetch per page

	const promises = [];

	// State to manage block data
	const [blockData, setBlockData] = useState([]);

	useInterval(() => {
		const jsonRpcUrl = JSON_RPC_URL;

		// Fetch the integer of the current block number the client is on.
		fetch(jsonRpcUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				jsonrpc: '2.0',
				method: 'eth_blockNumber',
				params: [],
				id: 1
			})
		})
			.then(response => response.json())
			.then(data => {
				setBlockNumber(parseInt(data.result, 16));
			})
			.catch(error => {
				console.log(error);
			});
	}, 1000);

	useEffect(() => {
		const jsonRpcUrl = JSON_RPC_URL;

		if (blockNumber) {
			// Calculate the range of blocks to fetch based on pagination
			const startIndex = blockNumber - (currentPage - 1) * itemsPerPage;
			const endIndex = Math.max(startIndex - itemsPerPage + 1, 1);

			const reversedBlockData = [];

			for (let i = startIndex; i >= endIndex; i--) {
				promises.push(
					fetch(jsonRpcUrl, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							jsonrpc: '2.0',
							method: 'eth_getBlockByNumber',
							params: [`0x${i.toString(16)}`, true],
							id: i
						})
					})
				);
			}

			Promise.all(promises)
				.then(responses => {
					return Promise.all(responses.map(response => response.json()));
				})
				.then(dataArray => {
					reversedBlockData.push(...dataArray.reverse());
					setBlockData(reversedBlockData);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}, [blockNumber, currentPage]);

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
	};

	return (
		<Container>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				mb={5}
			>
				<Typography variant='h4'>My Blocks</Typography>
			</Stack>

			<Grid
				container
				spacing={3}
			>
				{blockData.reverse().map(data => (
					<Grid
						item
						key={data.id}
						xs={12}
						sm={6}
						md={3}
					>
						<ProductCard blockData={data} />
					</Grid>
				))}
			</Grid>

			<Box
				sx={{
					mt: 3,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Typography variant='body2'>Page: {currentPage}</Typography>
				<Pagination
					count={Math.ceil(blockNumber / itemsPerPage)}
					page={currentPage}
					onChange={handlePageChange}
					color='primary'
					showFirstButton
					showLastButton
				/>
			</Box>
		</Container>
	);
}
