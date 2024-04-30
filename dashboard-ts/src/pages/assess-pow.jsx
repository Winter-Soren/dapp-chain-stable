import React from 'react';
import { AssessPowView } from 'src/sections/assess-pow/view';
import { Helmet } from 'react-helmet-async';

const AssessPow = () => {
	return (
		<>
			<Helmet>
				<title> Assess PoW | Minimal UI </title>
			</Helmet>

			<AssessPowView />
		</>
	);
};

export default AssessPow;
