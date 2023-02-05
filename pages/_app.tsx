import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import {
	MantineProvider,
	ColorScheme,
	ColorSchemeProvider,
} from '@mantine/core';
import { UnifrakturMaguntia } from '@next/font/google';

const unifrakturMaguntia = UnifrakturMaguntia({
	weight: '400',
	preload: false,
});

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const { Component, pageProps } = props;
	const [colorScheme, setColorScheme] = useState<ColorScheme>(
		props.colorScheme
	);

	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme =
			value || (colorScheme === 'dark' ? 'light' : 'dark');
		setColorScheme(nextColorScheme);
		setCookie('mantine-color-scheme', nextColorScheme, {
			maxAge: 60 * 60 * 24 * 30,
		});
	};

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{
					colorScheme,
					headings: {
						fontFamily: unifrakturMaguntia.className,
					},
				}}
				withGlobalStyles
				withNormalizeCSS
			>
				<Component {...pageProps} />
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
	colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
