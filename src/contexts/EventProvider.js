import { createContext, useContext, useEffect, useState } from 'react'
import { useAxiosState } from './AxiosProvider';

export const EventContext = createContext({
    events: [],
    setEvents: (event) => {}
});
export const useEventState = () => useContext(EventContext);

export function EventProvider({children}){
    const { publicAxios } = useAxiosState();

    const [events, setEvents] = useState([]);
    const value = {
        events,
        setEvents: (events) => setEvents(events),
    };

    useEffect(()=> {
        (async ()=> {
            let req = await publicAxios.get('/event');
            const events = req.data;
            setEvents(events);
        })();
    }, [publicAxios]);

    return (
       <EventContext.Provider value={value}>
        {children}
       </EventContext.Provider>
    )
}
export default EventProvider;