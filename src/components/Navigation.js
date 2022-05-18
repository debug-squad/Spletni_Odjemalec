import { styled, useTheme } from "@mui/system";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Button from "@mui/material/Button";

export default function Navigation({ changeTheme, isDarkTheme }) {
	
    const theme = useTheme();

	//Theme from /theme
	const NavigationBar = styled(Box)(({ theme }) => ({
		padding: "0",
		position: "static",
		margin: "0",
		minHeight: "3em",
		backgroundColor: theme.palette.background.menu,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	}));

	const MyLink = styled(Link)(({ theme }) => ({
		padding: "0.7em",
		fontSize: "1.5em",
		"&:hover": {
			backgroundColor: "#383838",
			color: "white",
		},
		textDecoration: "none",
		color: theme.palette.text.primary,
	}));

	return (
		<NavigationBar>
			<MyLink to="/home">Home</MyLink>
			<MyLink to="/map">Map</MyLink>
			<MyLink to="/graph">Graph</MyLink>
			{/*<MyLink to='/login'>Login</MyLink> */}
			<AdminPanelSettingsIcon sx={{ fontSize: "2.5em" }} />
			<Box sx={{ position: "absolute", right: "8em", display: "flex" }}>
				<Button onClick={changeTheme}>
					{!isDarkTheme ? (
						<DarkModeIcon sx={{ fontSize: "2.5em" }} />
					) : (
						<LightModeIcon sx={{ fontSize: "2.5em" }} />
					)}
				</Button>
			</Box>
		</NavigationBar>
	);
}
