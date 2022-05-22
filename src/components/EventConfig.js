import { Button } from "@mui/material";
import { styled, useTheme, Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAxiosState } from "../contexts/AxiosProvider";

export default function EventConfig(props) {
    const { authAxios } = useAxiosState();

    const ConfigBox = styled(Box)(({ theme }) => ({
		padding: "10px",
		position: "relative",
		marginTop: "1em",
		minHeight: "3em",
		backgroundColor: theme.palette.background.default,
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
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
       
	}));

    const [config, setConfig] = useState(props.config);
    const [interval, setInterval] = useState(props.config.interval);
    const [CSSSelector, setCSSSelector] = useState(props.config.CSS_selector);
    const [loading, setLoading] = useState(false);

    const Save = async ()=> {
        setLoading(true);
        const req = await authAxios.put('/config-event/' + config._id, { interval, CSS_selector: CSSSelector });
        const data = req.data;
        setConfig(data)
        setLoading(false);
    }

    const Delete = async ()=> {
        setLoading(true);
        const req = await authAxios.delete('/config-event/' + config._id);
        const data = req.data;
        setConfig(data)
        setLoading(false);

        if(props.onDelete) props.onDelete(config._id);
    }

    return (
        <>
            <ConfigBox>
                <h4>ID: { config?._id }</h4>
                <Button sx={{marginTop:"1em"}}	variant="contained" onClick={Delete} disabled={loading} style={({ top: "10px", right: "10px", position: "absolute"})}>Delete</Button>
                <label>Interval</label><br/>
                <input type="number" value={interval} onChange={e=>setInterval(+e.target.value)} placeholder="Interval seconds"/> Saved: {config?.interval}<br/>
                <label>CSS Selektor</label><br/>
                <input type="text" value={CSSSelector} onChange={e=>setCSSSelector(e.target.value)} placeholder="CSS Selector"/> Saved: {config?.CSS_selector}<br/>
                <br/>
                <Button sx={{marginTop:"1em"}}	variant="contained" onClick={Save} disabled={loading}>Save</Button>
                <br/>
                <br/>
                <span>Created: {config.created}</span><br/>
                <span>Modified: {config.modified}</span><br/>
               
            </ConfigBox>
        </>
    );
}