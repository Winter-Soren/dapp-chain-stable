import React, { useState, useEffect } from 'react';
import {
	Container,
	Grid,
	Card,
	Typography,
	useTheme,
	CardContent,
	CardMedia,
	Chip,
	Stack,
	CircularProgress,
	Box
} from '@mui/material';
import { ethers, formatUnits } from 'ethers';
import axios from 'axios';

import { convertIPFSUrl } from '../../../../src/utils/convertIPFSUrl';
import { NoNFTs } from '../../../../src/components';
import { MARKETPLACE_CONTRACT_ADDRESS } from '../../../../src/constants';
// import NFTMarketplace from '../../../../src/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import NFTMarketplace from '../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

const MyListingsView = () => {
	const theme = useTheme();
	const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState('not-loaded');

	useEffect(() => {
		loadNFTs();
	}, []);

	async function loadNFTs() {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(MARKETPLACE_CONTRACT_ADDRESS, NFTMarketplace.abi, signer);
			const data = await contract.fetchItemsListed();
			console.log('LSITED', data);
			const items = await Promise.all(
				data.map(async i => {
					const tokenUri = await contract.tokenURI(i.tokenId);
					const meta = await axios.get(
						convertIPFSUrl(tokenUri.replace('/metadata.json', '')) + '/metadata.json'
					);
					let price = formatUnits(i.price.toString(), 'ether');
					let item = {
						price,
						tokenId: i.tokenId,
						seller: i.seller,
						owner: i.owner,
						image: convertIPFSUrl(meta.data.image, true)
					};
					return item;
				})
			);

			setNfts(items);
			setLoadingState('loaded');
		} catch (error) {
			console.error('Error loading NFTs:', error);
			setLoadingState('error');
		}
	}

	if (loadingState === 'loaded' && !nfts.length) {
		return (
			<NoNFTs
				title='My Listings'
				body='No items in the List'
			/>
		);
	}

	if (loadingState === 'not-loaded' || loadingState === 'loading') {
		return (
			<Container>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					height='80vh'
				>
					<CircularProgress />
				</Box>
			</Container>
		);
	}

	return (
		<Container>
			<Typography
				variant='h4'
				mb={4}
			>
				My Listings
			</Typography>
			<Grid
				container
				spacing={4}
			>
				{nfts.map((nft, i) => (
					<Grid
						item
						key={i}
						xs={12}
						sm={6}
						md={4}
					>
						<Card
							sx={{
								display: 'flex',
								flexDirection: 'column',
								height: '100%'
							}}
						>
							<CardMedia
								image={nft.image}
								title={'This is your NFT ' + name}
								sx={{ height: 150, objectFit: 'cover' }}
							/>
							<CardContent>
								<Stack
									direction='row'
									alignItems='center'
									spacing={1}
									sx={{ justifyContent: 'flex-end' }}
								>
									<Typography variant='subtitle1'>{nft.price}</Typography>
									<Chip
										icon={
											<img
												src='/assets/ethereum.svg'
												alt='ETH'
												width={18}
												height={18}
											/>
										}
										label='ETH'
										size='small'
										sx={{
											marginRight: 1,
											backgroundColor: theme.palette.grey[300],
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center'
										}}
									/>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default MyListingsView;
