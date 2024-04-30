import React, { useState, useEffect, createContext, useContext } from 'react';
import { ethers } from 'ethers';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { set } from 'lodash';

const WalletContext = createContext();

export function WalletProvider({ children }) {
	const [account, setAccount] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const [metaMaskData, setMetaMaskData] = useState({
		networkId: null,
		chainId: null,
		account: null,
		balance: null,
		isMetaMaskConnected: false
	});

	const [wallet, setWallet] = useLocalStorage('wallet', {
		networkId: null,
		chainId: null,
		account: null,
		balance: null,
		isMetaMaskConnected: null
	});

	const connectMetaMask = async () => {
		try {
			if (window.ethereum) {
				await window.ethereum.request({ method: 'eth_requestAccounts' });
				const accounts = await window.ethereum.request({ method: 'eth_accounts' });
				const account = accounts[0];
				const networkId = await window.ethereum.request({ method: 'net_version' });
				const chainId = networkId;
				const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0]] });
				console.log('balance', balance);
				const isMetaMaskConnected = accounts[0] ? true : false;
				console.log('isMetaMaskConnected', isMetaMaskConnected);

				setMetaMaskData({
					networkId,
					chainId,
					account,
					balance,
					balance,
					isMetaMaskConnected
				});

				setWallet({
					networkId,
					chainId,
					account,
					balance,
					isMetaMaskConnected
				});

				console.log(metaMaskData);

				console.log('this is danger', { networkId, chainId, account, balance, isMetaMaskConnected });
			} else {
				alert('MetaMask is not installed. Please install MetaMask.');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const disconnectMetaMask = () => {
		setAccount(null);
		setIsConnected(false);
		setMetaMaskData({ ...metaMaskData, isMetaMaskConnected: false });
		setWallet({ ...wallet, isMetaMaskConnected: false });
	};

	useEffect(() => {
		if (window.ethereum && window.ethereum.selectedAddress) {
			let account = window.ethereum.selectedAddress;
			setAccount(account);
			setIsConnected(true);
			console.log(`Connected to MetaMask. Account: ${account}`);
			setMetaMaskData({ ...metaMaskData, account: account, isMetaMaskConnected: true });
			setWallet({ ...wallet, account: account, isMetaMaskConnected: true });
		}

		if (window.ethereum) {
			window.ethereum.on('accountsChanged', accounts => {
				if (accounts && accounts.length > 0) {
					setAccount(accounts[0]);
					setMetaMaskData({ ...metaMaskData, account: accounts[0] });
					setWallet({ ...wallet, account: accounts[0] });
					console.log(`MetaMask account changed. Account: ${accounts[0]}`);
				} else {
					setAccount(null);
					setIsConnected(false);
					setMetaMaskData({ ...metaMaskData, isMetaMaskConnected: false });
					setWallet({ ...wallet, isMetaMaskConnected: false });
					console.log('Disconnected from MetaMask.');
				}
			});
		}

		return () => {
			if (window.ethereum) {
				window.ethereum.removeAllListeners('accountsChanged');
			}
		};
	}, []);

	return (
		<WalletContext.Provider
			value={{
				account,
				isConnected,
				connectMetaMask,
				disconnectMetaMask,
				metaMaskData,
				wallet
			}}
		>
			{children}
		</WalletContext.Provider>
	);
}

export function useWallet() {
	const context = useContext(WalletContext);
	if (!context) {
		throw Error('useWallet must be used within a WalletProvider');
	}
	return context;
}
