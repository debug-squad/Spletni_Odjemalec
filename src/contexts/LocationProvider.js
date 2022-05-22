import { createContext, useContext, useState } from 'react';

export const LocationContext = createContext({
    exists: false,
    setExists: (exists) => {},

    position: [0, 0],
    setPosition: (position) => {},

    radius: 0,
    setRadius: (radius) => {}
});
export const useLocationState = () => useContext(LocationContext);

export function LocationProvider({children}){
    const [exists, setExists] = useState(false);
    const [position, setPosition] = useState([46.55372, 15.64767]);
    const [radius, setRadius] = useState(5_000);

    const value = {
        exists,
        setExists: (exists) => setExists(exists),

        position,
        setPosition: (position) => setPosition(position),

        radius,
        setRadius: (radius) => setRadius(radius)
    };

    return (
       <LocationContext.Provider value={value}>
        {children}
       </LocationContext.Provider>
    )
}
export default LocationProvider;