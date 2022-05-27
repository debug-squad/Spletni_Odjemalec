import { AccordionDetails, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEventState } from "../../contexts/EventProvider";
import { useAxiosState } from "../../contexts/AxiosProvider";
import { useTheme } from "@mui/system";
import Typography from "@mui/material/Typography";
import Accordion from '@mui/material/Accordion';
import * as React from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState,useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EventRemove() {
	const theme = useTheme();
	const { authAxios } = useAxiosState();
	const [events, setEvents] = useState([]);

	useEffect(() => {
		authAxios
			.get("/event")
			.then(function (req) {
				const events = req.data;
				setEvents(events);
				console.log(events);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const [message, setMessage] = React.useState("");

	const deleteEvent = (event, index) => {
		console.log(`Delete event ${event._id}`);
		authAxios
			.delete("/event/"+event._id)
			.then(function (response) {
				console.log(response);
				setMessage(`Deleted event ${event.title}`);
                setEvents(events.filter(e=> e._id != event._id));
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	//accordion

	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	//snackbar
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const action = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);
	return (
		<Box sx={{ marginTop: "2em" }}>
			<Accordion
				expanded={expanded === "panel1"}
				onChange={handleChange("panel1")}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
                    sx={{ textAlign: "center",backgroundColor:theme.palette.background.menu}}
				>
					<Typography variant="h4" gutterBottom component="div">
						Remove Events
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{events.map((event, index) => (
						<Box
                        key={index}
							sx={{
								backgroundColor: theme.palette.background.onDefault,
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginTop: "1em",
								padding: "1em",
								[theme.breakpoints.up("xs")]: {
									width: "90%",
									marginLeft: "5%",
								},
								[theme.breakpoints.up("sm")]: {
									width: "70%",
									marginLeft: "15%",
								},
								[theme.breakpoints.up("md")]: {
									width: "60%",
									marginLeft: "20%",
								},
							}}
						>
							<Typography
								sx={{ marginBottom: "0" }}
								variant="h5"
								gutterBottom
								component="div"
							>
								{event.title}
							</Typography>
                            <IconButton aria-label="delete"
                            onClick={() => {
                                console.log("deletetetett")
                              //  addToAttendance(event, index);
                               // handleClick();
                               deleteEvent(event,index)
                            }}
                            >
                                <DeleteIcon sx={{color:"red"}}/>
                            </IconButton>
						</Box>
					))}
				</AccordionDetails>
			</Accordion>
			<div>
				{handleClick}
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
					message={message}
					action={action}
				/>
			</div>
		</Box>
	);
}
