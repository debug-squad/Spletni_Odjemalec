import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/system";
import { useClientState } from "../contexts/ClientProvider";

export default function Logout(){
    const {setToken,setClient} = useClientState()    
	const theme = useTheme();
	const navigate = useNavigate();

	const LogOut = styled(Button)(({ theme }) => ({
		padding: "0.7em",
		fontSize: "1.5em",
		"&:hover": {
			backgroundColor: "#383838",
			color: "white",
		},
		textDecoration: "none",
		color: theme.palette.text.primary,
	}));

	const logoutUser = () => {
		console.log("logout user!")
		setToken(null)
		setClient(null)
		navigate("/home");
	}
    
return(
<LogOut><LogoutIcon onClick={logoutUser} sx={{fontSize: "1.5em"}}></LogoutIcon> </LogOut>
);
}