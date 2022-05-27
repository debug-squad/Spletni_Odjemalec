import { Button } from "@mui/material";
import { styled, useTheme, Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAxiosState } from "../../contexts/AxiosProvider";

export default function AddEventConfig(props) {
    const { authAxios } = useAxiosState();

    const ConfigBox = styled(Box)(({ theme }) => ({
		padding: "10px",
		position: "relative",
		marginTop: "1em",
		minHeight: "3em",
		backgroundColor: theme.palette.background.menu,
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

    const [interval, setInterval] = useState(10);
    const [CSSSelector, setCSSSelector] = useState("test");
    const [loading, setLoading] = useState(false);

    const Save = async ()=> {
        console.log("sdfdsfdsfdsf")
        setLoading(true);
        const req = await authAxios.post('/config-event', { interval, CSS_selector: CSSSelector });
        const data = req.data;
        setLoading(false);

        if(props.onChange)
            props.onChange(data);
    }

    return (
        <>
            <ConfigBox>
                <h3>Add new</h3>
                <label>Interval</label>
                <input type="number" value={interval} onChange={e=>setInterval(+e.target.value)} placeholder="Interval seconds"/>
                <label>CSS Selektor</label>
                <input type="text" value={CSSSelector} onChange={e=>setCSSSelector(e.target.value)} placeholder="CSS Selector"/>
                <Button sx={{marginTop:"1em"}}	variant="contained"	onClick={()=>{Save()}} disabled={loading}>Add</Button>
            </ConfigBox>
        </>
    );
}