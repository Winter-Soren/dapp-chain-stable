import { CardContent, Box, Button, Link, Card, Stack, Typography, Chip, CardMedia, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

export default function ProductCard({ price, name, image, buyNft }) {
	const theme = useTheme();
	return (
		<Card
			sx={{ width: 300, height: '100%', cursor: 'pointer', boxShadow: 3 }}
			// onClick={}
		>
			<CardMedia
				image={image}
				title={'This is your NFT ' + name}
				sx={{ height: 150, objectFit: 'cover' }}
			/>

			<CardContent>
				<Stack
					direction='row'
					spacing={2}
					sx={{ justifyContent: 'space-between' }}
				>
					<Link
						color='inherit'
						underline='hover'
						variant='h6'
						noWrap
						sx={{ flexGrow: 1, cursor: 'pointer' }}
					>
						{name}
					</Link>
					<Stack
						direction='row'
						alignItems='center'
						spacing={1}
						sx={{ justifyContent: 'flex-end' }}
					>
						<Typography variant='subtitle1'>{price}</Typography>
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
				</Stack>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
					<Button
						variant='contained'
						onClick={buyNft}
						sx={{ width: '35%' }}
					>
						Buy
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
}
