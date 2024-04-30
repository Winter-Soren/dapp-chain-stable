import React, { useState } from 'react';
import { Box, Button, Grid, Stack, TextField, InputAdornment, Typography, Chip, Avatar, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCreateNFT } from 'src/contexts/CreateNFTDataContext';
import { storeAsset } from 'src/utils/generateIPFSUrl';
import ConfettiExplosion from 'react-confetti-explosion';
import { listNFTForSale } from 'src/utils/listNftForSale';
import { useRouter } from 'src/routes/hooks';
import { useChainDetails } from 'src/contexts/ChainDetailsContext';

const NFTFormFields = ({ loading, setLoading }) => {
	const theme = useTheme();
	const route = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const { chainDetails } = useChainDetails();
	const { nftFormData, updateNftFormData } = useCreateNFT();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [showConfetti, setShowConfetti] = useState(false);

	const handlePriceChange = e => {
		const newPrice = e.target.value;
		const numericValue = newPrice.replace(/[^0-9.]/g, '');
		setPrice(numericValue);
		updateNftFormData({ ...nftFormData, price: numericValue });
	};

	const handleSetTitle = e => {
		setTitle(e.target.value);
		updateNftFormData({ ...nftFormData, title: e.target.value });
	};

	const handleSetDescription = e => {
		setDescription(e.target.value);
		updateNftFormData({ ...nftFormData, description: e.target.value });
	};

	const handleReset = () => {
		setTitle('');
		setDescription('');
		setPrice('');
		updateNftFormData({
			...nftFormData,
			base64Image: '',
			title: '',
			description: '',
			price: ''
		});
	};

	const handleSubmit = async () => {
		// Handle form submission logic here
		console.log('Form present in context:', nftFormData);
		// calling the generate ipfs url function
		setLoading(true);
		const ifpsUrl = await storeAsset(
			nftFormData.title,
			nftFormData.description,
			nftFormData.imageFile,
			'testImage'
		);

		await listNFTForSale(ifpsUrl, price, description, chainDetails);

		console.log('IPFS URL', ifpsUrl);
		setLoading(false);
		setShowConfetti(true);
		enqueueSnackbar('NFT Minted Successfully', {
			variant: 'success',
			autoHideDuration: 3000,
			anchorOrigin: {
				vertical: 'bottom',
				horizontal: 'right'
			}
		});

		route.push('/marketplace');
	};

	return (
		<Box>
			<Stack spacing={2}>
				<TextField
					label='Title'
					fullWidth
					value={title}
					onChange={handleSetTitle}
				/>
				<TextField
					label='Description'
					fullWidth
					multiline
					rows={4}
					value={description}
					onChange={handleSetDescription}
				/>
				<TextField
					label='Price'
					fullWidth
					type='text'
					value={price}
					onChange={handlePriceChange}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<Chip
									avatar={
										<Avatar
											alt='Ethereum'
											src='/assets/ethereum.png'
										/>
									}
									label='ETH'
								/>
							</InputAdornment>
						)
					}}
				/>
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					spacing={2}
					justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
				>
					<Button
						variant='contained'
						color='warning'
						onClick={handleReset}
						sx={{ width: 100 }}
					>
						Reset
					</Button>
					<Button
						variant='contained'
						color='success'
						onClick={handleSubmit}
						sx={{ width: 100 }}
					>
						Mint
					</Button>
				</Stack>
			</Stack>
			{showConfetti && <ConfettiExplosion />}
		</Box>
	);
};

export default NFTFormFields;
