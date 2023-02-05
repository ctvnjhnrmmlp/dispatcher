import Layout from '../layouts/Layout';
import WeatherSection from '../containers/WeatherSection';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';

const weatherClient = new QueryClient();

export default function Weather() {
	return (
		<Layout>
			<QueryClientProvider client={weatherClient}>
				<WeatherSection />
			</QueryClientProvider>
		</Layout>
	);
}
