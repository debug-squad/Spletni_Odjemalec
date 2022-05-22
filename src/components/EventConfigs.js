import { useEffect, useState } from "react";
import { useAxiosState } from "../contexts/AxiosProvider";
import AddEventConfig from "./AddEventConfig";
import EventConfig from "./EventConfig";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function EventConfigs(props) {
    const { authAxios } = useAxiosState();
    const [configs, setConfigs] = useState([]);

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(()=>{
        (async ()=>{
            const req = await authAxios.get('/config-event');
            const configs = req.data;
            setConfigs(configs);
        })()
    }, [])

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h4" gutterBottom component="div">
          Event Config						</Typography>
        </AccordionSummary>
        <AccordionDetails>
        { configs.map(config=><EventConfig key={config._id} config={config} onDelete={id => setConfigs(configs.filter(c=>c._id !== id))}/>)}
            <AddEventConfig onChange={c=>setConfigs([...configs, c])}/>
        </AccordionDetails>
      </Accordion>
        </>
    );
}