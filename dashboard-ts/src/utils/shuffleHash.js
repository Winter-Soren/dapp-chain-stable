export function shuffleHash(hash, index) {
	// Split the hash into prefix and rest
	const prefix = hash.slice(0, 2);
	const rest = hash.slice(2);

	// Convert the rest to an array of characters
	let chars = rest.split('');

	// Perform Fisher-Yates shuffle algorithm
	for (let i = chars.length - 1; i > 0; i--) {
		const j = index;
		[chars[i], chars[j]] = [chars[j], chars[i]];
	}

	// Join the shuffled characters back and prepend the prefix
	return prefix + chars.join('');
}
