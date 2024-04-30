import { ethers, parseUnits } from 'ethers';
import axios from 'axios';
import { BACKEND_API_URL, JSON_RPC_URL } from 'src/constants';
import { useChainDetails } from 'src/contexts/ChainDetailsContext';

import { MARKETPLACE_CONTRACT_ADDRESS } from 'src/constants';
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export async function listNFTForSale(ifpsUrl, price, description, chainDetails) {
	const provider = new ethers.BrowserProvider(window.ethereum);
	// const provider = new ethers.JsonRpcProvider(JSON_RPC_URL, { chainId: 100});
	const signer = await provider.getSigner();

	// /* next, create the item */
	price = parseUnits(String(price), 'ether');
	let contract = new ethers.Contract(MARKETPLACE_CONTRACT_ADDRESS, NFTMarketplace.abi, signer);
	let listingPrice = await contract.getListingPrice();
	listingPrice = listingPrice.toString();
	let transaction = await contract.createToken(ifpsUrl, price, { value: listingPrice });
	const receipt = await transaction.wait();

	// GET api call to get the cpu temperature
	let cpuTemp = null;

	try {
		const response = await axios.get(`${BACKEND_API_URL}/cpu-metrics`);
		cpuTemp = response.data;
		console.log('cpu temperature', response.data);
	} catch (error) {
		console.error('error in getting cpu metric', error);
	}

	// POST api call to send the transaction and the cpu temperature
	console.log('chain details inside mint nft func', chainDetails);
	let data = {
		receipt: JSON.stringify(receipt),
		transaction_type: 'Mint',
		block_difficulty: chainDetails.blockDifficulty,
		created_at: new Date(),
		...cpuTemp
	};
	console.log('this is data', data);

	try {
		const response = await axios.post(`${BACKEND_API_URL}/create-cpu-temperature-transaction/`, data);
		console.log('POST response', response);
	} catch (error) {
		console.error('error in posting txn', error);
	}

	// kundali mili
	console.log('receipt', receipt);
	console.log('string receipt', JSON.stringify(receipt));
}
