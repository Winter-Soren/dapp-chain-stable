import React from 'react';
import { Container, Grid, Stack, Typography } from '@mui/material';

const NoNFTs = ({ title, body }) => {
	return (
		<Container>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				mb={5}
			>
				<Typography variant='h4'>{title}</Typography>
			</Stack>
			<Grid
				container
				sx={{
					height: 'calc(60vh - 64px)',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Typography variant='h6'>{body}</Typography>
			</Grid>
		</Container>
	);
};

export default NoNFTs;
