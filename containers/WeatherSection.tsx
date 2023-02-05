import { useQuery } from '@tanstack/react-query';
import {
	Card,
	Title,
	Text,
	Container,
	List,
	Space,
	TextInput,
	Skeleton,
	createStyles,
} from '@mantine/core';
import {
	FaThermometerHalf,
	FaWater,
	FaFlag,
	FaWind,
	FaCloud,
	FaCloudMeatball,
} from 'react-icons/fa';
import axios from 'axios';
import _ from 'lodash';
import { useRef } from 'react';

const useStyles = createStyles(() => ({
	mainHeading: {
		textAlign: 'center',
		fontSize: 'clamp(5.5rem, calc(30.27vw + -7.07rem), 10.07rem)',
	},
	weatherHeading: {
		textAlign: 'center',
		fontSize: 'clamp(1.56rem, 3.32vw + -0.03rem, 4rem)',
		lineHeight: '1.2',
	},
}));

export default function WeatherSection() {
	const { classes } = useStyles();
	const searchInputRef = useRef<HTMLInputElement>(null);
	let locationQuery = 'Manila';

	const {
		data: weatherData,
		error: weatherError,
		status: weatherStatus,
		fetchStatus: weatherFetchStatus,
		refetch: refetchWeather,
	} = useQuery({
		queryKey: ['weather'],
		queryFn: async () => {
			return axios(
				`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_APIKEY}&q=${locationQuery}&units=metric`
			).then((res) => res.data);
		},
		refetchOnWindowFocus: false,
	});

	const handleRefetchLocation = () => {
		if (searchInputRef.current != null)
			locationQuery = searchInputRef.current.value;

		refetchWeather();
	};

	if (weatherStatus === 'loading' || weatherFetchStatus === 'fetching')
		return (
			<section>
				<Container size='sm'>
					<Title className={classes.mainHeading}>Weather</Title>
					<TextInput
						ref={searchInputRef}
						placeholder='Search location'
						size='xl'
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleRefetchLocation();
						}}
					/>
					<Space h='xl' />
					<Skeleton height={300} radius='xl' />
				</Container>
			</section>
		);

	if (weatherError)
		return (
			<section>
				<Container size='sm'>
					<Title className={classes.mainHeading}>Weather</Title>
					<TextInput
						ref={searchInputRef}
						placeholder='Search location'
						size='xl'
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleRefetchLocation();
						}}
					/>
					<Space h='xl' />
					{searchInputRef.current!.value.length <= 0 ? (
						<Text align='center' size='lg'>
							Please input a location.
						</Text>
					) : (
						<Text align='center' size='lg'>
							Location not found.
						</Text>
					)}
				</Container>
			</section>
		);

	return (
		<section>
			<Container size='sm'>
				<Title className={classes.mainHeading}>Weather</Title>
				<TextInput
					ref={searchInputRef}
					placeholder='Search location'
					size='xl'
					onKeyDown={(e) => {
						if (e.key === 'Enter') handleRefetchLocation();
					}}
				/>
				<Space h='xl' />
				<Card shadow='xs' p='lg' radius='md' withBorder>
					<Title className={classes.weatherHeading}>{weatherData.name}</Title>
					<Space h='xl' />
					<List spacing='md' size='md' center>
						<List.Item icon={<FaFlag />}>
							Country - {weatherData.sys.country}
						</List.Item>
						<List.Item icon={<FaThermometerHalf />}>
							Temperature - {weatherData.main.temp}°
						</List.Item>
						<List.Item icon={<FaWater />}>
							Humidity - {weatherData.main.humidity}°
						</List.Item>
						<List.Item icon={<FaCloud />}>
							Pressure - {weatherData.main.pressure}
						</List.Item>
						<List.Item icon={<FaCloudMeatball />}>
							Clouds - {_.startCase(weatherData.weather[0].description)}
						</List.Item>
						<List.Item icon={<FaWind />}>
							Wind - {weatherData.wind.speed}
						</List.Item>
					</List>
					<Space h='lg' />
				</Card>
			</Container>
		</section>
	);
}
