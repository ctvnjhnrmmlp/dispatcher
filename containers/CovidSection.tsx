import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
	Card,
	Title,
	Text,
	Container,
	Tabs,
	List,
	TextInput,
	Skeleton,
	createStyles,
	Space,
	Flex,
	Tooltip,
} from '@mantine/core';
import {
	FaViruses,
	FaSkull,
	FaVirusSlash,
	FaBed,
	FaLungsVirus,
	FaShieldVirus,
	FaFlag,
} from 'react-icons/fa';
import _ from 'lodash';
import { useRef } from 'react';

const COVID_CATEGORIES = ['continents', 'countries'];
const SKELETON_LOADERS = [
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
];

type Continent = {
	continent: string;
	active: string;
	cases: string;
	critical: string;
	deaths: string;
	recovered: string;
	tests: string;
};

const useStyles = createStyles(() => ({
	mainHeading: {
		textAlign: 'center',
		fontSize: 'clamp(5.5rem, calc(30.27vw + -7.07rem), 10.07rem)',
	},
	statHeading: {
		textAlign: 'center',
		fontSize: 'clamp(1.56rem, 3.32vw + -0.03rem, 4rem)',
		lineHeight: '1.2',
	},
}));

export default function CovidSection() {
	const { classes } = useStyles();
	const searchInputRef = useRef<HTMLInputElement>(null);
	let countriesQuery = 'countries';

	const {
		data: covidContinentsData,
		error: covidContinentsError,
		status: covidContinentsStatus,
		fetchStatus: covidContinentsFetchStatus,
		refetch: refetchContinents,
	} = useQuery({
		queryKey: ['continents'],
		queryFn: async () => {
			return axios(`https://disease.sh/v3/covid-19/continents`).then(
				(res) => res.data
			);
		},
		refetchOnWindowFocus: false,
	});

	const {
		data: covidCountriesData,
		error: covidCountriesError,
		status: covidCountriesStatus,
		fetchStatus: covidCountriesFetchStatus,
		refetch: refetchCountries,
	} = useQuery({
		queryKey: ['countries'],
		queryFn: async () => {
			try {
				const response = await axios(
					`https://disease.sh/v3/covid-19/${countriesQuery}`
				);

				return response.data;
			} catch (error) {
				throw new Error();
			}
		},
		refetchOnWindowFocus: false,
	});

	const handleRefetchCountries = () => {
		if (searchInputRef.current)
			countriesQuery = `countries/${searchInputRef.current.value}`;

		refetchCountries();
	};

	if (
		covidContinentsStatus === 'loading' ||
		covidContinentsFetchStatus === 'fetching' ||
		covidCountriesStatus === 'loading' ||
		covidCountriesFetchStatus === 'fetching'
	) {
		return (
			<section>
				<Container size='md'>
					<Title className={classes.mainHeading}>COVID-19</Title>
					<Tabs radius='xs' defaultValue='continents'>
						<Tabs.List>
							{COVID_CATEGORIES.map((category) => {
								return (
									<Tabs.Tab key={category} value={category}>
										{_.startCase(category)}
									</Tabs.Tab>
								);
							})}
						</Tabs.List>
						<Space h='xl' />
						{SKELETON_LOADERS.map(() => {
							return (
								<>
									<Skeleton height={300} radius='xl' />
									<Space h='md' />
								</>
							);
						})}
					</Tabs>
				</Container>
			</section>
		);
	}

	if (covidContinentsError) {
		return (
			<section>
				<Container size='md'>
					<Title className={classes.mainHeading}>COVID-19</Title>
					<Tabs radius='xs' defaultValue='continents'>
						<Tabs.List>
							{COVID_CATEGORIES.map((category) => {
								return (
									<Tabs.Tab key={category} value={category}>
										{_.startCase(category)}
									</Tabs.Tab>
								);
							})}
						</Tabs.List>
						<Space h='xl' />
						<Text align='center' size='lg'>
							Continents not found.
						</Text>
					</Tabs>
				</Container>
			</section>
		);
	}

	if (covidCountriesError) {
		return (
			<section>
				<Container size='md'>
					<Title className={classes.mainHeading}>COVID-19</Title>
					<Tabs radius='xs' defaultValue='continents'>
						<Tabs.List>
							{COVID_CATEGORIES.map((category) => {
								return (
									<Tabs.Tab key={category} value={category}>
										{_.startCase(category)}
									</Tabs.Tab>
								);
							})}
						</Tabs.List>
						<Space h='xl' />
						<Tooltip label='Press enter with no keywords to view all countries'>
							<TextInput
								ref={searchInputRef}
								placeholder='Search country'
								size='xl'
								onKeyDown={(e) => {
									if (e.key === 'Enter') handleRefetchCountries();
								}}
							/>
						</Tooltip>
						<Space h='xl' />
						<Text align='center' size='lg'>
							Country not found.
						</Text>
					</Tabs>
				</Container>
			</section>
		);
	}

	return (
		<section>
			<Container size='md'>
				<Title className={classes.mainHeading}>COVID-19</Title>
				<Tabs radius='xs' defaultValue='continents'>
					<Tabs.List>
						{COVID_CATEGORIES.map((category) => {
							return (
								<Tabs.Tab key={category} value={category}>
									{_.startCase(category)}
								</Tabs.Tab>
							);
						})}
					</Tabs.List>
					<Space h='xl' />
					<Tabs.Panel value='continents'>
						<Flex gap='xl' direction='column'>
							{covidContinentsData.map((continent: Continent) => {
								return (
									<Card
										key={continent.continent}
										shadow='xs'
										p='lg'
										radius='md'
										withBorder
									>
										<Title className={classes.statHeading}>
											{continent.continent}
										</Title>
										<Space h='xl' />
										<List spacing='md' size='md' center>
											<List.Item icon={<FaBed />}>
												Active Cases - {continent.active}
											</List.Item>
											<List.Item icon={<FaViruses />}>
												Total Cases - {continent.cases}
											</List.Item>
											<List.Item icon={<FaLungsVirus />}>
												Critical - {continent.critical}
											</List.Item>
											<List.Item icon={<FaSkull />}>
												Deaths - {continent.deaths}
											</List.Item>
											<List.Item icon={<FaVirusSlash />}>
												Recoveries - {continent.recovered}
											</List.Item>
											<List.Item icon={<FaShieldVirus />}>
												Tests - {continent.tests}
											</List.Item>
										</List>
										<Space h='lg' />
									</Card>
								);
							})}
						</Flex>
					</Tabs.Panel>
					<Tabs.Panel value='countries'>
						<Tooltip
							label='Press enter with no keywords to view all countries'
						>
							<TextInput
								ref={searchInputRef}
								placeholder='Search country'
								size='xl'
								onKeyDown={(e) => {
									if (e.key === 'Enter') handleRefetchCountries();
								}}
							/>
						</Tooltip>
						<Space h='xl' />
						<Flex gap='xl' direction='column'>
							{covidCountriesData instanceof Array ? (
								covidCountriesData.map((country) => {
									return (
										<Card
											key={country.country}
											shadow='xs'
											p='lg'
											radius='md'
											withBorder
										>
											<Title className={classes.statHeading}>
												{country.country}
											</Title>
											<List spacing='md' size='md' center>
												<List.Item icon={<FaFlag />}>
													Continent - {country.continent}
												</List.Item>
												<List.Item icon={<FaBed />}>
													Active Cases - {country.active}
												</List.Item>
												<List.Item icon={<FaViruses />}>
													Total Cases - {country.cases}
												</List.Item>
												<List.Item icon={<FaLungsVirus />}>
													Critical - {country.critical}
												</List.Item>
												<List.Item icon={<FaSkull />}>
													Deaths - {country.deaths}
												</List.Item>
												<List.Item icon={<FaVirusSlash />}>
													Recoveries - {country.recovered}
												</List.Item>
												<List.Item icon={<FaShieldVirus />}>
													Tests - {country.tests}
												</List.Item>
											</List>
											<Space h='lg' />
										</Card>
									);
								})
							) : (
								<Card shadow='xs' p='lg' radius='md' withBorder>
									<Title className={classes.statHeading}>
										{covidCountriesData.country}
									</Title>
									<List spacing='md' size='md' center>
										<List.Item icon={<FaFlag />}>
											Continent - {covidCountriesData.continent}
										</List.Item>
										<List.Item icon={<FaBed />}>
											Active Cases - {covidCountriesData.active}
										</List.Item>
										<List.Item icon={<FaViruses />}>
											Total Cases - {covidCountriesData.cases}
										</List.Item>
										<List.Item icon={<FaLungsVirus />}>
											Critical - {covidCountriesData.critical}
										</List.Item>
										<List.Item icon={<FaSkull />}>
											Deaths - {covidCountriesData.deaths}
										</List.Item>
										<List.Item icon={<FaVirusSlash />} color='green'>
											Recoveries - {covidCountriesData.recovered}
										</List.Item>
										<List.Item icon={<FaShieldVirus />}>
											Tests - {covidCountriesData.tests}
										</List.Item>
									</List>
									<Space h='lg' />
								</Card>
							)}
						</Flex>
					</Tabs.Panel>
				</Tabs>
			</Container>
		</section>
	);
}
