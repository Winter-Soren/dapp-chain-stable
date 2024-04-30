import React from 'react';

import { Box, Container, Stack, Typography, Button } from '@mui/material';
import Iconify from 'src/components/iconify';

import MintNFTForm from '../create-nft-form';

const MintNFTView = () => {
	return (
		<Container>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				mb={5}
			>
				<Typography variant='h4'>Mint NFTs</Typography>
			</Stack>
			{/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button> */}

			<MintNFTForm />
		</Container>
	);
};

export default MintNFTView;
