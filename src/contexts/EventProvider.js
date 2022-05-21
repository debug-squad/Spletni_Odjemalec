import { createContext, useContext, useState } from 'react'

export const EventContext = createContext({
    events: [],
    setEvents: (event) => {}
});
export const useEventState = () => useContext(EventContext);

export function EventProvider({children}){
    const [events, setEvents] = useState([]);
    const value = {
        events,
        setEvents: (events) => setEvents(events),
    };

    return (
       <EventContext.Provider value={value}>
        {children}
       </EventContext.Provider>
    )
}
export default EventProvider;