import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Stack, Typography, Button, Chip, useTheme } from '@mui/material';
import { ethers, JsonRpcProvider, formatUnits, parseUnits } from 'ethers';
import { useRouter } from 'src/routes/hooks';
import axios from 'axios';

import { convertIPFSUrl } from 'src/utils/convertIPFSUrl';
import { NoNFTs } from 'src/components';
import { MARKETPLACE_CONTRACT_ADDRESS } from 'src/constants';
import NFTMarketplace from '../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

const MyNFTsView = () => {
	const theme = useTheme();
	const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState('not-loaded');
	const router = useRouter();

	useEffect(() => {
		loadNFTs();
	}, []);

	async function loadNFTs() {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();

		const marketplaceContract = new ethers.Contract(MARKETPLACE_CONTRACT_ADDRESS, NFTMarketplace.abi, signer);
		const data = await marketplaceContract.fetchMyNFTs();
		console.log('MY NFT', data);
		const items = await Promise.all(
			data.map(async i => {
				const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
				const meta = await axios.get(convertIPFSUrl(tokenURI.replace('/metadata.json', '')) + '/metadata.json');
				let price = formatUnits(i.price.toString(), 'ether');
				let item = {
					price,
					tokenId: i.tokenId,
					seller: i.seller,
					owner: i.owner,
					image: convertIPFSUrl(meta.data.image, true),
					tokenURI
				};
				return item;
			})
		);
		setNfts(items);
		setLoadingState('loaded');
	}
	function listNFT(nft) {
		console.log('nft:', nft);
		router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
	}

	if (loadingState === 'loaded' && !nfts.length)
		return (
			<NoNFTs
				title='My NFTs'
				body='No items in the marketplace'
			/>
		);

	return (
		<Container>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				mb={5}
			>
				<Typography variant='h4'>My NFTs</Typography>
			</Stack>
			{/* listing the nfts */}
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
								p: 2,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								height: '100%'
							}}
						>
							<div>
								<img
									src={nft.image}
									alt={nft.name}
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover'
									}}
								/>
								<Typography
									variant='h5'
									sx={{ mt: 2 }}
								>
									{nft.name}
								</Typography>
								<Typography
									variant='body1'
									sx={{ mt: 2 }}
								>
									{nft.description}
								</Typography>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginTop: 'auto'
								}}
							>
								{/* <Typography
									variant='h5'
									sx={{ mt: 2 }}
								>
									{nft.price} ETH
								</Typography> */}

								{/* <Button
									variant='contained'
									onClick={() => listNFT(nft)}
								>
									List
								</Button> */}
							</div>
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
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default MyNFTsView;
