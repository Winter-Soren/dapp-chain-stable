import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number) {
	return numeral(number).format();
}

export function fCurrency(number) {
	const format = number ? numeral(number).format('$0,0.00') : '';

	return result(format, '.00');
}

export function fPercent(number) {
	const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

	return result(format, '.0');
}

export function fShortenNumber(number) {
	const format = number ? numeral(number).format('0.00a') : '';

	return result(format, '.00');
}

export function fData(number) {
	const format = number ? numeral(number).format('0.0 b') : '';

	return result(format, '.0');
}

function result(format, key = '.00') {
	const isInteger = format.includes(key);

	return isInteger ? format.replace(key, '') : format;
}

export function convertBittoGb(bit) {
	return bit / Math.pow(1024, 3);
}

export function convertExponent(number) {
	if (number === 0) {
		return '0';
	}
	const exponent = Math.floor(Math.log10(Math.abs(number)));
	const mantissa = number / Math.pow(10, exponent);
	const formattedExponent = exponent !== 0 ? `x 10` : '';
	return `${mantissa.toFixed(2)} ${formattedExponent}`;
}
