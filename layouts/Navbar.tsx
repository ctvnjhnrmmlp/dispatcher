import { createStyles, Header, Container, Title } from '@mantine/core';
import TogglerMenu from '../containers/TogglerMenu';

const useStyles = createStyles(() => ({
	headerContainerContent: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'sticky',
	},
	containerContent: {
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		width: '100%',
	},
}));

export default function Navbar() {
	const { classes } = useStyles();

	return (
		<Header height={60} className={classes.headerContainerContent}>
			<Container size='xl' className={classes.containerContent}>
				<Title order={3} size='h1'>
					Dispatcher
				</Title>
				<TogglerMenu />
			</Container>
		</Header>
	);
}
