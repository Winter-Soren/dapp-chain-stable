import { JSON_RPC_URL } from 'src/constants';
const BASE_URL = JSON_RPC_URL;

const getRequest = async body => {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Body: JSON.stringify(body)
	};

	try {
		const response = await fetch(`${BASE_URL}`, {
			method: 'GET',
			headers: headers,
			Body: JSON.stringify(body)
		});
		const json = await response.json();
		console.log(json);
		return json;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const GET = getRequest;
