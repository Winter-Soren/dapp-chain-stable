function addIpfsLink(url) {
	const parts = url.split('/');
	parts.splice(-1, 0, '.ipfs.localhost:48084');
	return parts.join('/').replace(/\/(?=\.)/, '');
}

export function convertIPFSUrl(inputUrl, image = false) {
	// Replace "ipfs://" with "https://ipfs.io/ipfs/"
	console.log(inputUrl);
	const outputUrl = inputUrl.replace('ipfs://', 'http://');
	return image ? addIpfsLink(outputUrl) : outputUrl + '.ipfs.localhost:48084';
}
