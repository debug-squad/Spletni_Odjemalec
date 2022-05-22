import BarChart from "../components/Graph/BarChart";
import { useEventState } from "../contexts/EventProvider";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/system";

export default function Graph() {
	const { events } = useEventState();
    const theme = useTheme()

	const [data, setData] = useState(events);
	const [sort, setSort]= useState('descending');

	useEffect(()=> {
		let new_data = [...events];
		switch(sort) {
			case "ascending":
				new_data.sort(function (a, b) {
					if (a.attendace < b.attendace) {
						return -1;
					} else if (a.attendace > b.attendace) {
						return 1;
					} else {
						return 0;
					}
				});
				break;
			case "descending":
				new_data.sort(function (a, b) {
					if (a.attendace > b.attendace) {
						return -1;
					} else if (a.attendace < b.attendace) {
						return 1;
					} else {
						return 0;
					}
				});
				break;
			default:
		}
		setData(new_data);
	}, [events, sort])

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
								defaultValue={sort}
								label="Age"
								onChange={e=>setSort(e.target.value)}
                                sx={{backgroundColor:theme.palette.border.primary,color:theme.palette.text.primary}}
							>
								<MenuItem sx={{color:"black"}}value={"descending"}>Descending</MenuItem>
								<MenuItem sx={{color:"black"}}value={"ascending"}>Ascending</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<BarChart data={data} />
				</div>
			</div>
		</>
	);
}
