import {
	createStyles,
	Container,
	Title,
	Text,
	Anchor,
	useMantineColorScheme,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
	footer: {
		marginTop: 120,
		borderTop: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
		}`,
	},
	footerContainerContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
	},
}));

export default function Footer() {
	const { classes } = useStyles();
	const { colorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	return (
		<footer className={classes.footer}>
			<Container className={classes.footerContainerContent}>
				<Anchor
					href='https://ctvnjhnrmmlp.vercel.app'
					target='_blank'
					underline={false}
				>
					<Title order={3} size='h1' color={dark ? '#C1C2C5' : '#000000'}>
						John Rommel Octaviano
					</Title>
				</Anchor>
				<Text>
					@Dispatcher {`${new Date().getFullYear()}`}. All Rights Reserved.
				</Text>
			</Container>
		</footer>
	);
}
