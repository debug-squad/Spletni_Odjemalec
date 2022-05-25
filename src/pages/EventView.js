import { useEventState } from '../contexts/EventProvider';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAxiosState } from '../contexts/AxiosProvider';
import { Box, width } from '@mui/system';
import { Card, CardContent, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@emotion/react';
import { color } from 'd3';

export default function EventView() {
    const { publicAxios } = useAxiosState();
    const theme = useTheme();
    const { id } = useParams();
    const { events } = useEventState();
    const [event, setEvent] = useState(events.filter(e => e._id === id)?.[0]);


    useEffect(() => {
        (async () => {
            const req = await publicAxios.get('/event/' + id);
            const event = req.data;
            console.log(event)
            setEvent(event);
        })()
    }, [id]);

    return (event ? <>
        <Box sx={{ display: "flex", maxWidth: "100%", margin: "1em" }}>
            <Box sx={{ minWidth:"50%",display:"flex",alignItems:"center", justifyContent:"center"}}>
                <img src={event.image_url}></img>
            </Box>
            <Box sx={{ width:"100%",margin: "1em", display: "flex", flexDirection: "column",alignItems:"center", justifyContent:"center",textAlign:"center" }}>
                <Typography  sx={{ margin: "none", fontSize:"2em" }} gutterBottom component="div">
                    {event.title}
                </Typography>
                <Typography  sx={{ margin: "none",fontSize:"1.5em" }} gutterBottom component="div">
                    {event.description}
                </Typography>
                <Card sx={{  padding: "1em", marginTop:"1em",backgroundColor:theme.palette.background.onDefault }}>
                    <CardContent sx={{ textAlign: "left" }}>
                        <Typography sx={{ display: "flex", alignItems: "center", marginTop:"0.5em" }} color={theme.palette.text.primary} component="div">
                            <CalendarMonthIcon sx={{ fontSize: "2em", marginRight: "0.2em" }} />   {event.created}
                        </Typography>
                        <Typography sx={{ display: "flex", alignItems: "center",marginTop:"0.5em" }} color={theme.palette.text.primary}component="div">
                            <LocationOnIcon sx={{ fontSize: "2em", marginRight: "0.2em" }} />   {event.coordinates}
                        </Typography>
                        <Typography sx={{ display: "flex", alignItems: "center",marginTop:"0.5em" }} color={theme.palette.text.primary} component="div">
                            <PermContactCalendarIcon sx={{ fontSize: "2em", marginRight: "0.2em" }} />   {event.contact}
                        </Typography>
                        <Typography sx={{ display: "flex", alignItems: "center",marginTop:"0.5em" }} color={theme.palette.text.primary} component="div">
                            <StarIcon sx={{ fontSize: "2em", marginRight: "0.2em" }} />   {event.tags}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>

    </> : <span>Loading...</span>);
}