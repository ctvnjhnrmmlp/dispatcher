import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
	createStyles,
	Title,
	Tabs,
	Container,
	Group,
	Card,
	Text,
	Image,
	Space,
	Skeleton,
} from '@mantine/core';
import _ from 'lodash';

const NEWS_SECTIONS = [
	'world',
	'arts',
	'automobiles',
	'books',
	'business',
	'fashion',
	'food',
	'health',
	'home',
	'politics',
	'science',
	'sports',
	'technology',
	'travel',
];

type News = {
	id: string;
	url: string;
	multimedia: [{ url: string; caption: string }];
	published_date: string;
	title: string;
	abstract: string;
	byline: string;
};

const useStyles = createStyles(() => ({
	mainHeading: {
		textAlign: 'center',
		fontSize: 'clamp(5.5rem, calc(30.27vw + -7.07rem), 10.07rem)',
	},
	articleHeading: {
		textAlign: 'center',
		fontSize: 'clamp(1.56rem, 3.32vw + -0.03rem, 4rem)',
		lineHeight: '1.2',
	},
	articleParagraph: {
		textAlign: 'center',
		fontSize: 'clamp(1.30rem, 0.91vw + 0.77rem, 2.67rem)',
		lineHeight: '1.3',
		width: '93%',
		marginInline: 'auto',
	},
	articleDate: {
		textAlign: 'center',
		fontStyle: 'italic',
		fontSize: 'clamp(1.25rem, 0.59vw + 0.65rem, 2rem)',
		lineHeight: '1',
	},
	articleAuthor: {
		textAlign: 'center',
		fontSize: 'clamp(1.30rem, 1.16vw + 0.91rem, 2.67rem)',
		lineHeight: '1',
	},
}));

export default function NewsSection() {
	const { classes } = useStyles();
	let sectionQuery = 'world';

	const {
		data: newsData,
		error: newsError,
		status: newsStatus,
		fetchStatus: newsFetchStatus,
		refetch: refetchNews,
	} = useQuery({
		queryKey: ['news'],
		queryFn: async () => {
			return axios(
				`https://api.nytimes.com/svc/topstories/v2/${sectionQuery}.json?api-key=${process.env.NEXT_PUBLIC_NEWYORKTIMES_APIKEY}`
			).then((res) => res.data);
		},
		refetchOnWindowFocus: false,
	});

	const handleRefetch = (section: string) => {
		sectionQuery = section;
		refetchNews();
	};

	if (newsStatus === 'loading' || newsFetchStatus === 'fetching') {
		return (
			<section>
				<Container size='xl'>
					<Title className={classes.mainHeading}>News</Title>
					<Tabs radius='xs' defaultValue='world'>
						<Group position='center' spacing='xl'>
							<Tabs.List>
								{NEWS_SECTIONS.map((newsSection) => (
									<Tabs.Tab
										key={newsSection}
										value={newsSection}
										onClick={() => handleRefetch(newsSection)}
									>
										{_.startCase(newsSection)}
									</Tabs.Tab>
								))}
							</Tabs.List>
						</Group>
						<Space h='xl' />
						{NEWS_SECTIONS.map(() => {
							return (
								<>
									<Skeleton height={800} radius='xl' />
									<Space h='md' />
								</>
							);
						})}
					</Tabs>
				</Container>
			</section>
		);
	}

	if (newsError) {
		return (
			<section>
				<Container size='xl'>
					<Title className={classes.mainHeading}>News</Title>
					<Tabs radius='xs' defaultValue='world'>
						<Group position='center' spacing='xl'>
							<Tabs.List>
								{NEWS_SECTIONS.map((newsSection) => (
									<Tabs.Tab
										key={newsSection}
										value={newsSection}
										onClick={() => handleRefetch(newsSection)}
									>
										{_.startCase(newsSection)}
									</Tabs.Tab>
								))}
							</Tabs.List>
						</Group>
						<Space h='xl' />
						<Tabs.Panel value={sectionQuery}>
							<Title align='center'>Error</Title>
						</Tabs.Panel>
					</Tabs>
				</Container>
			</section>
		);
	}

	return (
		<section>
			<Container size='xl'>
				<Title className={classes.mainHeading}>News</Title>
				<Tabs radius='xs' defaultValue='world'>
					<Group position='center' spacing='xl'>
						<Tabs.List>
							{NEWS_SECTIONS.map((newsSection) => (
								<Tabs.Tab
									key={newsSection}
									value={newsSection}
									onClick={() => handleRefetch(newsSection)}
								>
									{_.startCase(newsSection)}
								</Tabs.Tab>
							))}
						</Tabs.List>
					</Group>
					<Space h='xl' />
					{NEWS_SECTIONS.map((newsSection) => (
						<Tabs.Panel key={newsSection} value={newsSection}>
							<Group spacing='xl' position='center'>
								{newsData.results.map((news: News) => (
									<Card
										key={news.id}
										shadow='xs'
										p='lg'
										radius='md'
										component='a'
										href={news.url}
										target='_blank'
									>
										<Card.Section>
											<Image
												src={news.multimedia ? news.multimedia[0].url : ''}
												alt={news.multimedia ? news.multimedia[0].caption : ''}
												width='100%'
											/>
										</Card.Section>
										<Space h='xl' />
										<Space h='xl' />
										<Text className={classes.articleDate}>
											{news.published_date}
										</Text>
										<Space h='xl' />
										<Title className={classes.articleHeading}>
											{news.title}
										</Title>
										<Space h='md' />
										<Text className={classes.articleParagraph}>
											{news.abstract}
										</Text>
										<Space h='xl' />
										<Space h='xl' />
										<Text className={classes.articleAuthor}>{news.byline}</Text>
										<Space h='xl' />
										<Space h='sm' />
									</Card>
								))}
							</Group>
						</Tabs.Panel>
					))}
				</Tabs>
			</Container>
		</section>
	);
}
