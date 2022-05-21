import { useEventState } from '../contexts/EventProvider';
import { useParams } from 'react-router-dom';
import { useState } from 'react';


export default function EventView(){
    const {id} = useParams();
    const {events} = useEventState();
    const [event, setEvent] = useState(events.filter(e=>e._id === id)[0]);

    return(
        <>
            <h1>{event.title}</h1>
            <pre>{ JSON.stringify(event, 2, ' ') }</pre>
        </>
    );
}