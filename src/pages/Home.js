import { useEventState } from "../contexts/EventProvider";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import EventCard from "../components/EventCard";
import Typography from "@mui/material/Typography";

export default function Info() {
	const { events } = useEventState();
	return (
        <Box sx={{ maxWidth: "100%", margin:"1em"}}>
        <Typography variant="h4" gutterBottom component="div" sx={{textAlign:"center", margin:"1em"}}>All Events</Typography>
            <Grid sx={{display:"flex",alignItems:"center",justifyContent:"center",paddingBottom:"2em" }} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
			{events.map((event) => (
                 <Grid item xs="auto">
				<EventCard event={event} />
                </Grid>
			))}
            </Grid>
		</Box>
	);
}
