import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";

function App() {
	//Sets dark theme from localstorage, if not found creates default White theme
	const [isDarkTheme, SetDarkTheme] = useState(false);
	const changeTheme = () => {
		SetDarkTheme(!isDarkTheme);
		if (!isDarkTheme) {
			localStorage.setItem("chosenTheme", "dark");
		} else {
			localStorage.setItem("chosenTheme", "light");
		}
	};

	useEffect(() => {
		const theme = localStorage.getItem("chosenTheme");
		if (theme) {
			if (theme == "dark") {
				SetDarkTheme(true);
			} else {
				SetDarkTheme(false);
			}
		} else {
			localStorage.setItem("chosenTheme", "light");
		}
	});

	return (
		<ThemeProvider theme={isDarkTheme ? lightTheme : darkTheme}>
			<CssBaseline />
			<BrowserRouter>
				<Navigation changeTheme={changeTheme} isDarkTheme={isDarkTheme} />
				<Routes>
					<Route to="/" exact element={<Home />}></Route>
					<Route to="/home" exact element={<Home />}></Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
