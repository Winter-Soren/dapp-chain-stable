import React, { useState } from 'react';
import { Button, IconButton, Typography, Box, CircularProgress, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { useCreateNFT } from 'src/contexts/CreateNFTDataContext';

const ImageUpload = () => {
	const theme = useTheme();
	const { nftFormData, updateNftFormData } = useCreateNFT();
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isDragOver, setIsDragOver] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const handleImageDrop = event => {
		event.preventDefault();
		setIsDragOver(false);
		if (!image && !isLoading) {
			const selectedImage = event.dataTransfer.files[0];
			handleImage(selectedImage);
		}
	};

	const handleImageUpload = event => {
		if (!image && !isLoading) {
			const selectedImage = event.target.files[0];
			handleImage(selectedImage);
		}
	};

	const handleDeleteImage = () => {
		setImage(null);
	};

	const handleImage = selectedImage => {
		setIsLoading(true);
		if (selectedImage && validateImage(selectedImage)) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
				updateNftFormData({ ...nftFormData, base64Image: reader.result, imageFile: selectedImage });
				setIsLoading(false);
			};
			reader.readAsDataURL(selectedImage);
		} else {
			// Handle invalid image format
			setIsLoading(false);
			console.error('Invalid image format. Please select a .png, .jpg, or .jpeg file.');
			enqueueSnackbar('Invalid image format. Please select a .png, .jpg, or .jpeg file.', {
				variant: 'error',
				autoHideDuration: 2000,
				// action: (key) => (
				//   <IconButton onClick={() => closeSnackbar(key)} size="small" color="inherit">
				//     <CloseIcon />
				//   </IconButton>
				// ),
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right'
				}
			});
		}
	};

	const validateImage = file => {
		const allowedExtensions = /(\.png|\.jpg|\.jpeg|\.avif)$/i;
		return allowedExtensions.test(file.name);
	};

	const handleDragOver = event => {
		event.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = () => {
		setIsDragOver(false);
	};

	return (
		<Box
			sx={{
				textAlign: 'center',
				padding: '20px',
				border: `2.5px dashed ${isDragOver ? `${theme.palette.primary.main}` : `${theme.palette.grey[600]}`}`,
				backgroundColor: `${isDragOver ? `${theme.palette.primary.lighter}` : `${theme.palette.grey[50]}`}`,
				borderRadius: '13px',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}}
			onDrop={handleImageDrop}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
		>
			<Typography
				variant='h5'
				gutterBottom
			>
				Drag & Drop or Click to Upload Image
			</Typography>
			{isLoading ? (
				<CircularProgress
					color='primary'
					size={50}
				/>
			) : image ? (
				<div style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }}>
					<IconButton
						style={{ position: 'absolute', top: '0', right: '0' }}
						onClick={handleDeleteImage}
						color='error'
					>
						<DeleteIcon fontSize='small' />
					</IconButton>
					<img
						src={image}
						alt='Preview'
						style={{ maxWidth: '100%', maxHeight: '220px' }}
					/>
					{/* {image} */}
					<Typography
						variant='body2'
						style={{ marginTop: '5px' }}
					>
						Size: {image && `${(image.length * 0.75) / 1024} KB`} {/* Approximate size in KB */}
					</Typography>
				</div>
			) : (
				<label htmlFor='image-upload'>
					<IconButton
						color='primary'
						component='span'
					>
						<AddCircleOutlineIcon fontSize='large' />
					</IconButton>
				</label>
			)}
			{image && <Typography variant='caption'>{image.name}</Typography>}
			<input
				type='file'
				accept='.png, .jpg, .jpeg'
				style={{ display: 'none' }}
				id='image-upload'
				onChange={handleImageUpload}
			/>
		</Box>
	);
};

export default ImageUpload;
