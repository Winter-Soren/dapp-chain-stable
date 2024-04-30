import { NFTStorage, File } from 'nft.storage';

const NFT_STORAGE_API_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgzN0ZjNDlFMjAxRjA1MDI2NWMwMkFjMTNmNUMxNDkwZmZiQjM4Y0YiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NTcyNzE1ODAzMSwibmFtZSI6Ikhhc0NoYWluIn0.wie03qXMRGqXjpyU-PP4g4ly6WzuEkRoFh7o2A1CXHs';

export async function storeAsset(title, description, base64Image, fileName) {
	const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });

	// Convert base64 image to a Uint8Array
	const binaryData = base64Image;

	const metadata = await client.store({
		name: title,
		description: description,
		// image: new File(
		//     [binaryData],
		//     fileName,
		//     { type: 'image/jpg' }
		// ),
		image: base64Image
	});

	console.log('Metadata stored on Filecoin and IPFS with URL:', metadata.url);
	return metadata.url;
}
