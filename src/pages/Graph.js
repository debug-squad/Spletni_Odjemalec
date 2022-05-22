import BarChart from "../components/Graph/BarChart";
import { useEventState } from "../contexts/EventProvider";
import Filter from "../components/Filter";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/system";

export default function Graph() {
	const { events } = useEventState();
    const theme = useTheme()    
	const [value, setValue] = useState(events);

	const handleChange = (event) => {
		if (event.target.value === "descending") {
			console.log("descending");
			value.sort(function (a, b) {
				if (a.attendace > b.attendace) {
					return -1;
				} else if (a.attendace < b.attendace) {
					return 1;
				} else {
					return 0;
				}
			});
			setValue([...value]);
			console.log(value);
		} else {
			//ascending
			console.log("ascending");
			value.sort(function (a, b) {
				if (a.attendace < b.attendace) {
					return -1;
				} else if (a.attendace > b.attendace) {
					return 1;
				} else {
					return 0;
				}
			});
			setValue([...value]);
			console.log(value);
		}
	};

	return (
		<>
			<div className="map-container">
				<Filter />
				<div className="map-view">
					<Box sx={{ minWidth: 120,margin:"1em" }}>
						<FormControl fullWidth color={"primary"} sx={{backgroundColor:"green"}}>
							<InputLabel id="demo-simple-select-label">
								Sort by attendance
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								defaultValue="descending"
								label="Age"
								onChange={handleChange}
                                sx={{backgroundColor:theme.palette.border.primary,color:theme.palette.text.primary}}
							>
								<MenuItem sx={{color:"black"}}value={"descending"}>Descending</MenuItem>
								<MenuItem sx={{color:"black"}}value={"ascending"}>Ascending</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<BarChart data={value} />
				</div>
			</div>
		</>
	);
}
