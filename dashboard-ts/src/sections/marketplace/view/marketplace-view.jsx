import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Stack, Typography, Button, CircularProgress } from '@mui/material';
import { ethers, JsonRpcProvider, formatUnits, parseUnits } from 'ethers';
import axios from 'axios';

import { convertIPFSUrl } from 'src/utils/convertIPFSUrl';
import { NoNFTs } from 'src/components';
import ProductCard from '../product-card';
import { useChainDetails } from 'src/contexts/ChainDetailsContext';

const marketplaceAddress = '0xED7c84E25Ef97B4561A1273eC9676b441E2543B0';
import { JSON_RPC_URL, MARKETPLACE_CONTRACT_ADDRESS } from 'src/constants';
import NFTMarketplace from '../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

const MarketplaceView = () => {
	const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState('not-loaded');
	const { blockDifficulty, blockNumber } = useChainDetails();

	useEffect(() => {
		loadNFTs();
	}, []);

	async function loadNFTs() {
		try {
			// console.log('first');
			const provider = new ethers.BrowserProvider(window.ethereum);

			console.log(provider);

			const contract = new ethers.Contract(MARKETPLACE_CONTRACT_ADDRESS, NFTMarketplace.abi, provider);

			console.log('this is my contract: ', contract);
			const data = await contract.fetchMarketItems();
			console.log('datatasdf: ', data);
			const items = [];
			for (let index = 0; index < data.length; index++) {
				const i = data[index];
				const tokenUri = await contract.tokenURI(i.tokenId);
				console.log('TEKN', convertIPFSUrl(tokenUri.replace('/metadata.json', '')) + '/metadata.json');
				const ipfsData = await fetch(
					convertIPFSUrl(tokenUri.replace('/metadata.json', '')) + '/metadata.json'
				).then(async res => await res.json());
				console.log('IPFS DATA', ipfsData);
				const meta = ipfsData;
				console.log('META', meta);
				let price = formatUnits(i.price.toString(), 'ether');
				let item = {
					price,
					tokenId: i.tokenId,
					seller: i.seller,
					owner: i.owner,
					image: convertIPFSUrl(meta.image, true),
					name: meta.name,
					description: meta.description
				};
				items.push(item);
				console.log('ITEM', item);
			}

			// const filteredItems = items.filter(item => item !== null);
			console.log(items);
			setNfts(items);
			setLoadingState('loaded');
		} catch (error) {
			console.error('Error loading NFTs:', error);
			// setNfts([]);
			setLoadingState('error');
		}
	}

	async function buyNft(nft) {
		/* needs the user to sign the transaction, so will use Web3Provider and sign it */
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const contract = new ethers.Contract(MARKETPLACE_CONTRACT_ADDRESS, NFTMarketplace.abi, signer);

		/* user will be prompted to pay the asking price to complete the transaction */
		const price = parseUnits(nft.price.toString(), 'ether');
		const transaction = await contract.createMarketSale(nft.tokenId, {
			value: price
		});
		const receipt = await transaction.wait();
		console.log('bought data: ', receipt);
		// GET api call to get the cpu temperature
		// let cpuTemp = null;
		// let ramUsage = null;
		// let cpuFanSpeed = null;
		// const jsonRpcUrl = JSON_RPC_URL;

		// try {
		// 	const response = await axios.get('BACKEND_API_URL/cpu-metrics');
		// 	cpuTemp = response.data;
		// 	console.log('cpu temperature', response.data);

		// } catch (error) {
		// 	console.error('error', error);
		// }

		// POST api call to send the transaction and the cpu temperature
		// let data = {
		// 	receipt: receipt,
		// 	cpu_temperature: cpuTemp,
		// 	transaction_type: 'Buy NFT',
		// 	ram_usage: ramUsage,
		// 	cpu_fan_speed: cpuFanSpeed,
		// 	block_difficulty: blockDifficulty
		// };

		// try {
		// 	const response = await axios.post('BACKEND_API_URL/create-cpu-temperature-transaction/', data);
		// 	console.log('response', response);
		// } catch (error) {
		// 	console.error('Error creating cpu transaction', error);
		// }

		loadNFTs();
	}

	// if
	return loadingState==="not-loaded" ? (
		<CircularProgress></CircularProgress>
	):(!nfts.length ? (
		<NoNFTs
			title='NFT Marketplace'
			body='No items in the marketplace'
		/>
	) : (
		<Container>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				mb={5}
			>
				<Typography variant='h4'>NFT Marketplace</Typography>
			</Stack>
			<Grid container>
				{nfts.map((nft, i) => (
					<Grid
						item
						key={i}
						xs
						sm
						md
						sx={{
							my: 0.4
						}}
					>
						<ProductCard
							price={nft.price}
							name={nft.name}
							image={nft.image}
							buyNft={() => buyNft(nft)}
						/>
					</Grid>
				))}
			</Grid>
		</Container>)
	);
};

export default MarketplaceView;
