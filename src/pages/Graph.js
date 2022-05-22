import { useEffect } from 'react';
import { useEventState } from '../contexts/EventProvider';
export default function Graph(){
    const {events} = useEventState();
    console.log(events)    

    return (
        <>
        <h2>Graph</h2>
    
        {events.map(event=>
                <p>{event._id}</p>
                )}

        </>
    );
}