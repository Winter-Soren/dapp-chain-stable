import { Helmet } from 'react-helmet-async';
import { CpuMetricsView } from 'src/sections/cpu-metrics/view';

// ----------------------------------------------------------------------
export default function CpuMetrics() {
	return (
		<>
			<Helmet>
				<title> Cpu Metrics | Minimal UI </title>
			</Helmet>

			<CpuMetricsView />
		</>
	);
}
