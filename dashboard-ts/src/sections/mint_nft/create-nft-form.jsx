import React, { useState } from 'react';
import { Button, Grid, CircularProgress } from '@mui/material';

import ImageUpload from './image-upload';
import NFTFormFields from './nft-form-fields';
import { Box } from '@mui/material';

const CreateNFTForm = () => {
	const [Loading, setLoading] = useState(false);
	return (
		<Box>
			{Loading ? (
				<>
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<CircularProgress />
					</Box>
				</>
			) : (
				<Grid
					container
					spacing={2}
				>
					<Grid
						item
						xs={6}
						md={6}
						sm={12}
					>
						<ImageUpload />
					</Grid>
					<Grid
						item
						xs={6}
						md={6}
						sm={12}
					>
						<NFTFormFields
							loading={Loading}
							setLoading={setLoading}
						/>
					</Grid>
					{/* <img
						src={`https://ipfs.io/ipfs/bafybeieio4pkq73mzp6bjex7qhrd2hsl5i7wgs25unc52e6g2sbyuhyori/Screenshot%20from%202023-10-25%2015-32-34.png`}
						alt=''
					/> */}
				</Grid>
			)}
		</Box>
	);
};

export default CreateNFTForm;
