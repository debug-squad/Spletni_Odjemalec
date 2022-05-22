import { Box, useTheme,styled } from "@mui/system";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Settings({changeTheme,isDarkTheme}){
    const theme = useTheme();
    const ChangeColor = styled(Box)(({ theme }) => ({
		display:"flex",
        alignItems:"center",
        justifyContent:"center", 
        backgroundColor: theme.palette.background.menu, 
        position:"fixed",
        right:"1em",
        bottom:"5%", 
        textAlign:"center", 
        borderRadius:"100%", 
        
        padding:"1.1em",
		"&:hover": {
            cursor:"pointer",
			backgroundColor: theme.palette.background.menuDarker,
			color: "white",
		},
        zIndex: 2000,
	}));

    return(
        <ChangeColor  onClick={changeTheme} sx={{}}>
					{!isDarkTheme ? (
						<DarkModeIcon sx={{ fontSize: "1.8em" }} />
					) : (
						<LightModeIcon sx={{ fontSize: "1.8em" }} />
					)}
        </ChangeColor>
    );
}