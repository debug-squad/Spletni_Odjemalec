import { createContext, useContext, useState } from 'react'

export const InfrastructureContext = createContext({
    infrastructures: [],
    setInfrastructures: (infrastructures) => {}
});
export const useInstractureState = () => useContext(InfrastructureContext);

export function InfrastructureProvider({children}){
    const [infrastructures, setInfrastructures] = useState([]);
    const value = {
        infrastructures,
        setInfrastructures: (infrastructures) => setInfrastructures(infrastructures),
    };

    return (
       <InfrastructureContext.Provider value={value}>
        {children}
       </InfrastructureContext.Provider>
    )
}
export default InfrastructureProvider;