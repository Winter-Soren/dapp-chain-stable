import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// importing wallet context
import { WalletProvider } from './contexts/WalletContext';

import { SnackbarProvider } from 'notistack';

// importing context providers
import { CreateNFTDataContextProvider } from 'src/contexts/CreateNFTDataContext';
import { SellerOrBuyerContextProvider } from './contexts/SellerOrBuyerContext';
import { CPUTempContextProvider } from './contexts/CPUTempContext';
import { ChainDetailsProvider } from './contexts/ChainDetailsContext';

// ----------------------------------------------------------------------

export default function App() {
	useScrollToTop();

	return (
		<ThemeProvider>
			<SnackbarProvider
				preventDuplicate
				maxSnack={3}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				autoHideDuration={3000}
			>
				<WalletProvider>
					<SellerOrBuyerContextProvider>
						<CreateNFTDataContextProvider>
							<ChainDetailsProvider>
								<CPUTempContextProvider>
									{console.log('working masta')}
									<Router />
								</CPUTempContextProvider>
							</ChainDetailsProvider>
						</CreateNFTDataContextProvider>
					</SellerOrBuyerContextProvider>
				</WalletProvider>
			</SnackbarProvider>
		</ThemeProvider>
	);
}
