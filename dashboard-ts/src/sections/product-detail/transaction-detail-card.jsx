import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TransactionDetailCard({ blockData }) {
	const [isExpanded, setIsExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setIsExpanded(!isExpanded);
	};

	const transactions = blockData?.result?.transactions || [];

	const convertHexToReadable = hex => {
		return parseInt(hex, 16).toString();
	};

	const formatTimestamp = timestamp => {
		const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
		return date.toLocaleString();
	};

	return (
		<Card sx={{ width: '90%', margin: 'auto' }}>
			<CardContent>
				<Typography variant='h6'>Transaction Details</Typography>
				<Typography
					variant='subtitle2'
					color='textSecondary'
				>
					Timestamp: {formatTimestamp(convertHexToReadable(blockData?.result?.timestamp))}
				</Typography>
				<Typography
					variant='subtitle2'
					color='textSecondary'
				>
					Hash: {blockData?.result?.hash}
				</Typography>
				<Typography
					variant='subtitle2'
					color='textSecondary'
				>
					Parent Hash: {blockData?.result?.parentHash}
				</Typography>
				<Typography
					variant='subtitle2'
					color='textSecondary'
				>
					Nonce: {convertHexToReadable(blockData?.result?.nonce)}
				</Typography>
				<Typography
					variant='subtitle2'
					color='textSecondary'
				>
					Number: {convertHexToReadable(blockData?.result?.number)}
				</Typography>
				<Typography
					variant='subtitle2'
					color='textSecondary'
				>
					Gas Used: {convertHexToReadable(blockData?.result?.gasUsed)}
				</Typography>
				<Typography
					variant='subtitle2'
					color='textSecondary'
				>
					Size: {convertHexToReadable(blockData?.result?.size)}
				</Typography>
				<hr /> {/* Add a horizontal line to separate content */}
				{transactions.length > 0 && (
					<>
						<Typography
							variant='subtitle2'
							color='textSecondary'
						>
							Transactions:
						</Typography>
						<IconButton
							aria-label='expand more'
							onClick={handleExpandClick}
							sx={{
								marginLeft: 'auto',
								transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
								transition: 'transform 0.2s'
							}}
						>
							<ExpandMoreIcon />
						</IconButton>
						{isExpanded && (
							<div>
								{transactions.map((transaction, index) => (
									<div key={index}>
										<Typography variant='body1'>From: {transaction.from}</Typography>
										<Typography
											variant='body2'
											color='textSecondary'
											sx={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}
										>
											Gas Price: {convertHexToReadable(transaction.gasPrice)}
										</Typography>
										<Typography
											variant='body1'
											sx={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}
										>
											Value: {convertHexToReadable(transaction.value)}
										</Typography>
										<Typography
											variant='body2'
											color='textSecondary'
											sx={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}
										>
											Input: {transaction.input}
										</Typography>
										<hr />
									</div>
								))}
							</div>
						)}
					</>
				)}
				{transactions.length === 0 && (
					<Typography
						variant='body2'
						color='textSecondary'
					>
						No transactions happened.
					</Typography>
				)}
			</CardContent>
		</Card>
	);
}
