import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import AddAttendance from "../components/Admin/AddAttendande";
import EventRemove from "../components/Admin/EventRemove";
import EventConfigs from "../components/EventConfigs";
import { useClientState } from "../contexts/ClientProvider";

export default function Admin() {
	const {client} = useClientState();

	return (
		<>
			{ !(client && client.is_admin) ? <Navigate to="/"/>: null}
			<Typography
				variant="h3"
				sx={{ textAlign: "center", margin: "1em" }}
				gutterBottom
				component="div"
			>
				Admin panel
			</Typography>
			<AddAttendance />
			<EventConfigs  />
			<EventRemove  />
		</>
	);
}
