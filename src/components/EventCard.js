import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import styled from '@emotion/styled';

export default function EventCard({event}){   

    const theme = useTheme();   
    console.log(JSON.stringify(event));

    const MyLink = styled(Link)(({ theme }) => ({
		padding: "0.7em",
		fontSize: "1em",
		"&:hover": {
			backgroundColor: "#383838",
			color: "white",
		},
		textDecoration: "none",
		color: theme.palette.text.primary,
		display: "flex"
	}));


    return(
            <Card sx={{backgroundColor:theme.palette.background.menu,color:theme.palette.text.primary, width: 345, height: 370, display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
              <CardMedia
                component="img"
                height="140"
                image={event.image_url}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {event.title}
                </Typography>
                <Typography variant="body2" >
                 {event.description}
                </Typography>
              </CardContent>
              <CardActions >
                  <MyLink sx={{color:theme.palette.text.primary}} to={'/event/'+event._id}>Learn more</MyLink>
              </CardActions>
            </Card>
    )
}