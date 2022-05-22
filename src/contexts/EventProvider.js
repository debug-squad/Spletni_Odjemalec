import { createContext, useContext, useEffect, useState } from 'react'
import { useAxiosState } from './AxiosProvider';

export const EventContext = createContext({
    events: [],
    setEvents: (event) => {},

    eventParams: {},
    setEventParams: (params) => {},
});
export const useEventState = () => useContext(EventContext);

export function EventProvider({children}){
    const { publicAxios } = useAxiosState();

    const [events, setEvents] = useState([]);
    const [eventParams, setEventParams] = useState({});
    const value = {
        events,
        setEvents: (events) => setEvents(events),

        eventParams,
        setEventParams: (params) => setEventParams(params),
    };

    useEffect(()=> {
        (async ()=> {
            let req = await publicAxios.get('/event', { params: eventParams });
            const events = req.data;
            setEvents(events);
        })();
    }, [publicAxios, eventParams]);

    return (
       <EventContext.Provider value={value}>
        {children}
       </EventContext.Provider>
    )
}
export default EventProvider;