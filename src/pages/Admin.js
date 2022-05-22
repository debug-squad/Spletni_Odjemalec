import { Typography } from "@mui/material";
import AddAttendance from "../components/AddAttendande";
import EventConfigs from "../components/EventConfigs";

export default function Admin() {
	return (
		<>
			<Typography
				variant="h3"
				sx={{ textAlign: "center", margin: "1em" }}
				gutterBottom
				component="div"
			>
				Admin panel
			</Typography>
			<AddAttendance />
			<EventConfigs sx={{ marginTop: "2em" }} />
		</>
	);
}
