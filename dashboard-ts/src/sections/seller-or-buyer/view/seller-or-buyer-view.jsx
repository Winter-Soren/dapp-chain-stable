import React from 'react';
import { Box, Container, Stack, Typography, Button, Avatar } from '@mui/material';
import Iconify from 'src/components/iconify';

import { useRouter } from 'src/routes/hooks';
import { useSetUser } from 'src/contexts/SellerOrBuyerContext';

const SellerOrBuyerView = () => {
	const { sellerOrBuyer, updateSellerOrBuyer } = useSetUser();
	const router = useRouter();

	const handleOnClickSeller = () => {
		updateSellerOrBuyer({ isSeller: true });
		router.push('/');
	};

	const handleOnClickBuyer = () => {
		updateSellerOrBuyer({ isSeller: false });
		router.push('/');
	};

	return (
		<Container
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh'
			}}
		>
			<Box>
				<Typography
					variant='h3'
					align='center'
					sx={{
						fontWeight: 'bold',
						mb: 3
					}}
				>
					Are you Seller or Buyer?
				</Typography>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-evenly'
					spacing={2}
				>
					<Button
						variant='contained'
						color='inherit'
						size='large'
						onClick={handleOnClickBuyer}
						sx={{ width: 150 }}
						startIcon={
							<Avatar
								sx={{ width: 45, height: 45 }}
								alt='Ethereum'
								src='/assets/images/avatars/avatar_4.jpg'
							/>
						}
					>
						Buyer
					</Button>
					<Button
						variant='contained'
						color='inherit'
						size='large'
						onClick={handleOnClickSeller}
						sx={{ width: 150 }}
						startIcon={
							<Avatar
								sx={{ width: 45, height: 45 }}
								alt='Buyer'
								src='/assets/images/avatars/avatar_2.jpg'
							/>
						}
					>
						Seller
					</Button>
				</Stack>
			</Box>
		</Container>
	);
};

export default SellerOrBuyerView;
