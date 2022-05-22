import { useEffect, useState } from "react";
import { useAxiosState } from "../contexts/AxiosProvider";
import AddEventConfig from "./AddEventConfig";
import EventConfig from "./EventConfig";

export default function EventConfigs(props) {
    const { authAxios } = useAxiosState();
    const [configs, setConfigs] = useState([]);

    useEffect(()=>{
        (async ()=>{
            const req = await authAxios.get('/config_event');
            const configs = req.data;
            setConfigs(configs);
        })()
    }, [])

    return (
        <>
            <h1>Event Config</h1>
            { configs.map(config=><EventConfig key={config._id} config={config} onDelete={id => setConfigs(configs.filter(c=>c._id !== id))}/>)}
            <AddEventConfig onChange={c=>setConfigs([...configs, c])}/>
        </>
    );
}