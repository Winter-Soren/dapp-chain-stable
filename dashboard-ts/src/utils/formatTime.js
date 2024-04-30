export function formatTime(timeTaken) {
	const tim = timeTaken / 60;
	if (tim >= 60) {
		const minutes = Math.floor(tim / 60);
		return `${minutes} minute${minutes > 1 ? 's' : ''}`;
	} else {
		return `${tim} second${tim !== 1 ? 's' : ''}`;
	}
}
