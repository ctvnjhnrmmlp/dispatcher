import Layout from '../layouts/Layout';
import NewsSection from '../containers/NewsSection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const newsQueryClient = new QueryClient();

export default function Home() {
	return (
		<Layout>
			<QueryClientProvider client={newsQueryClient}>
				<NewsSection />
			</QueryClientProvider>
		</Layout>
	);
}
