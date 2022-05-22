import { styled, useTheme, Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAxiosState } from "../contexts/AxiosProvider";

export default function EventConfig(props) {
    const { authAxios } = useAxiosState();

    const ConfigBox = styled(Box)(({ theme }) => ({
		padding: "10px",
		position: "relative",
		margin: "10px",
		minHeight: "3em",
		backgroundColor: theme.palette.background.menu,
		// display: "flex",
		/// alignItems: "center",
		// justifyContent: "center",
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
                <button onClick={Delete} disabled={loading} style={({ top: "10px", right: "10px", position: "absolute"})}>Delete</button>
                <label>Interval</label><br/>
                <input type="number" value={interval} onChange={e=>setInterval(+e.target.value)} placeholder="Interval seconds"/> Saved: {config?.interval}<br/>
                <label>CSS Selektor</label><br/>
                <input type="text" value={CSSSelector} onChange={e=>setCSSSelector(e.target.value)} placeholder="CSS Selector"/> Saved: {config?.CSS_selector}<br/>
                <br/>
                <button onClick={Save} disabled={loading}>Save</button>
                <br/>
                <br/>
                <span>Created: {config.created}</span><br/>
                <span>Modified: {config.modified}</span><br/>
               
            </ConfigBox>
        </>
    );
}