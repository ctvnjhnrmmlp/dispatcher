import {
	Button,
	createStyles,
	Menu,
	useMantineColorScheme,
} from '@mantine/core';
import Link from 'next/link';
import {
	FaSun,
	FaMoon,
	FaVirus,
	FaCloudSun,
	FaNewspaper,
} from 'react-icons/fa';

const useStyles = createStyles(() => ({
	menuContainer: {
		marginLeft: 'auto',
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
	},
}));

export default function TogglerMenu() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';
	const { classes } = useStyles();

	return (
		<Menu>
			<Menu.Target>
				<Button variant='filled' color={dark ? 'gray' : 'dark'}>
					Menu
				</Button>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>Actions</Menu.Label>
				<Menu.Item
					icon={dark ? <FaSun /> : <FaMoon />}
					onClick={() => toggleColorScheme()}
				>
					Theme
				</Menu.Item>
				<Menu.Item icon={<FaNewspaper />}>
					<Link href='/' className={classes.link}>
						News
					</Link>
				</Menu.Item>
				<Menu.Item icon={<FaCloudSun />}>
					<Link href='/weather' className={classes.link}>
						Weather
					</Link>
				</Menu.Item>
				<Menu.Item icon={<FaVirus />}>
					<Link href='/covid' className={classes.link}>
						COVID-19
					</Link>
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
