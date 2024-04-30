import React, { useEffect, useState } from 'react';
import {
	Box,
	Container,
	Grid,
	Typography,
	Paper,
	Stack,
	Card,
	Table,
	TableBody,
	TableRow,
	TableCell,
	CardContent
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { JSON_RPC_URL } from 'src/constants';
import TransactionDetailCard from '../transaction-detail-card';

const ProductDetailView = () => {
	const { hash } = useParams();
	const [blockData, setBlockData] = useState({});
	const [transactionData, setTransactionData] = useState({});
	const [transactionsReceipt, setTransactionsReceipt] = useState({});

	useEffect(() => {
		const jsonRpcUrl = JSON_RPC_URL;

		// Fetch the block data based on the hash
		fetch(jsonRpcUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				jsonrpc: '2.0',
				method: 'eth_getBlockByHash',
				params: [hash, true],
				id: 1
			})
		})
			.then(response => response.json())
			.then(data => {
				setBlockData(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [hash]);

	return blockData.result ? (
		<Container>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				mb={5}
			>
				<Typography variant='h4'>Block #{parseInt(blockData.result?.number, 16)}</Typography>
			</Stack>
			<Grid
				container
				// spacing={1}
				sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}
			>
				{blockData.result ? (
					<>
						<Grid
							item
							sx={{
								justifyContent: 'flex-end'
							}}
						>
							<Card sx={{ width: '100%' }}>
								<CardContent>
									<Typography variant='h5'>Block Details</Typography>
									<Table>
										<TableBody>
											<TableRow>
												<TableCell>Block Hash</TableCell>
												<TableCell>{blockData.result.hash}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Block Parent Hash</TableCell>
												<TableCell>{blockData.result.parentHash}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Time</TableCell>
												<TableCell>
													{new Date(
														parseInt(blockData.result.timestamp, 16) * 1000
													).toLocaleString()}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Nonce</TableCell>
												<TableCell>{blockData.result.nonce}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Difficulty</TableCell>
												<TableCell>{parseInt(blockData.result.difficulty, 16)}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Gas Limit</TableCell>
												<TableCell>{parseInt(blockData.result.gasLimit, 16)}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Total Difficulty</TableCell>
												<TableCell>{parseInt(blockData.result.totalDifficulty, 16)}</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</Grid>
					</>
				) : (
					<></>
				)}
				{/* {JSON.stringify(blockData)} */}
				{blockData.result ? (
					<>
						<Grid item>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									mt: 2
								}}
							>
								<TransactionDetailCard blockData={blockData} />
							</Box>
						</Grid>
					</>
				) : (
					<></>
				)}
			</Grid>
		</Container>
	) : (
		<></>
	);
};

export default ProductDetailView;
