import { useEventState } from '../contexts/EventProvider';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAxiosState } from '../contexts/AxiosProvider';


export default function EventView(){
    const {publicAxios} = useAxiosState();
    
    const {id} = useParams();
    const {events} = useEventState();
    const [event, setEvent] = useState(events.filter(e=>e._id === id)?.[0]);


    useEffect(()=>{
        (async ()=> {
            const req = await publicAxios.get('/event/' + id);
            const event = req.data;
            setEvent(event);
        })()
    }, [id]);

    return (event ? <>
        <h1>{event.title}</h1>
        <pre>{ JSON.stringify(event, 2, ' ') }</pre>
    </>: <span>Loading...</span>);
}