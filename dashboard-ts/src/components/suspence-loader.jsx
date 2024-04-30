import { useEffect } from 'react';
import { Box, CircularProgress, LinearProgress } from '@mui/material';

function SuspenseLoader() {
	return (
		<Box
			position='absolute'
			sx={{
				top: '50%',
				left: '55%'
			}}
		>
			<CircularProgress
				size={64}
				disableShrink
				thickness={3}
			/>
		</Box>
	);
}

export default SuspenseLoader;
