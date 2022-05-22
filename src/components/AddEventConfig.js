import { styled, useTheme, Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAxiosState } from "../contexts/AxiosProvider";

export default function AddEventConfig(props) {
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

    const [interval, setInterval] = useState(10);
    const [CSSSelector, setCSSSelector] = useState("test");
    const [loading, setLoading] = useState(false);

    const Save = async ()=> {
        setLoading(true);
        const req = await authAxios.post('/config_event', { interval, CSS_selector: CSSSelector });
        const data = req.data;
        setLoading(false);

        if(props.onChange)
            props.onChange(data);
    }

    return (
        <>
            <ConfigBox>
                <h4>Add new</h4>
                <label>Interval</label><br/>
                <input type="number" value={interval} onChange={e=>setInterval(+e.target.value)} placeholder="Interval seconds"/><br/>
                <label>CSS Selektor</label><br/>
                <input type="text" value={CSSSelector} onChange={e=>setCSSSelector(e.target.value)} placeholder="CSS Selector"/><br/>
                <br/>
                <button onClick={Save} disabled={loading}>Add</button>
            </ConfigBox>
        </>
    );
}