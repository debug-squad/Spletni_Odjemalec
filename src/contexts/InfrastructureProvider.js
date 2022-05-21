import { createContext, useContext, useEffect, useState } from 'react'
import { useAxiosState } from './AxiosProvider';

export const InfrastructureContext = createContext({
    infrastructures: [],
    setInfrastructures: (infrastructures) => {}
});
export const useInstractureState = () => useContext(InfrastructureContext);

export function InfrastructureProvider({children}){
    const { publicAxios } = useAxiosState();

    const [infrastructures, setInfrastructures] = useState([]);
    const value = {
        infrastructures,
        setInfrastructures: (infrastructures) => setInfrastructures(infrastructures),
    };

    useEffect(()=> {
        (async ()=> {
            let req = await publicAxios.get('/infrastructure');
            const infrastructures = req.data;
            setInfrastructures(infrastructures);
        })();
    }, [publicAxios]);

    return (
       <InfrastructureContext.Provider value={value}>
        {children}
       </InfrastructureContext.Provider>
    )
}
export default InfrastructureProvider;