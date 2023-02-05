import Layout from '../layouts/Layout';
import CovidSection from '../containers/CovidSection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const covidClient = new QueryClient();

export default function Covid() {
	return (
		<Layout>
			<QueryClientProvider client={covidClient}>
				<CovidSection />
			</QueryClientProvider>
		</Layout>
	);
}
