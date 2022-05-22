import { styled, useTheme } from "@mui/system";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useClientState } from "../contexts/ClientProvider";
import Logout from "../pages/Logout";

export default function Navigation() {
	
	const theme = useTheme();
	const {token,client,setToken,setClient} = useClientState()   

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
		display: "flex"
	}));

	return (
		<NavigationBar>
			<MyLink to="/home">Home</MyLink>
			<MyLink to="/map">Map</MyLink>
			<MyLink to="/graph">Graph</MyLink>
			{!client ? <MyLink to="/login">Login</MyLink> : <Logout />}
			<Box sx={{ position: "absolute", right: "8em"}}>
			{client?.is_admin && <MyLink to="/admin"><AdminPanelSettingsIcon sx={{ fontSize: "1.5em" }} /></MyLink>  }		
			</Box>
		</NavigationBar>
	);
}
