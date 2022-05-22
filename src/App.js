import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Settings from "./components/Settings";
import {ClientProvider} from './contexts/ClientProvider';
import {EventProvider} from './contexts/EventProvider';
import {InfrastructureProvider} from './contexts/InfrastructureProvider';
import {AxiosProvider} from './contexts/AxiosProvider';
import Login from "./pages/Login";
import MapView from "./pages/MapView";
import EventView from "./pages/EventView";
import InfrastructureView from "./pages/InfrastructureView";
import Admin from "./pages/Admin";

import LocationProvider from "./contexts/LocationProvider";
import Graph from "./pages/Graph";
import FilterProvider from "./contexts/FilterProvider";

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
			if (theme === "dark") {
				SetDarkTheme(true);
			} else {
				SetDarkTheme(false);
			}
		} else {
			localStorage.setItem("chosenTheme", "light");
		}
	}, []);

	return (
		<BrowserRouter>
			<ClientProvider>
				<AxiosProvider>
					<EventProvider>
						<InfrastructureProvider>
							<FilterProvider>
								<ThemeProvider theme={isDarkTheme ? lightTheme : darkTheme}>
									<CssBaseline />
									<Settings changeTheme={changeTheme} isDarkTheme={isDarkTheme}/>
									<Navigation />
									<Routes>
										<Route path="/" exact element={<Home />}></Route>
										<Route path="/login" exact element={<Login />}></Route>
										<Route path="/home" exact element={<Home />}></Route>
										<Route path="/map" exact element={<MapView />}></Route>
										<Route path="/admin" exact element={<Admin />}></Route>
										<Route path="/event/:id" exact element={<EventView />}></Route>
										<Route path="/infrastructure/:id" exact element={<InfrastructureView />}></Route>
										<Route path="/graph" exact element={<Graph />}></Route>
									</Routes>
								</ThemeProvider>
							</FilterProvider>
						</InfrastructureProvider>
					</EventProvider>
				</AxiosProvider>
			</ClientProvider>
		</BrowserRouter>
	);
}

export default App;
