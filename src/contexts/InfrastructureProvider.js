import { createContext, useContext, useEffect, useState } from 'react'
import { useAxiosState } from './AxiosProvider';

export const InfrastructureContext = createContext({
    infrastructures: [],
    setInfrastructures: (infrastructures) => {},

    infrastructuresParams: {},
    setInfrastructureParams: (params) => {},
});
export const useInstractureState = () => useContext(InfrastructureContext);

export function InfrastructureProvider({children}){
    const { publicAxios } = useAxiosState();

    const [infrastructures, setInfrastructures] = useState([]);
    const [infrastructuresParams, setInfrastructureParams] = useState({});
    const value = {
        infrastructures,
        setInfrastructures: (infrastructures) => setInfrastructures(infrastructures),

        infrastructuresParams,
        setInfrastructureParams: (params) => setInfrastructureParams(params),
    };

    useEffect(()=> {
        (async ()=> {
            let req = await publicAxios.get('/infrastructure', { params: infrastructuresParams });
            const infrastructures = req.data;
            setInfrastructures(infrastructures);
        })();
    }, [publicAxios, infrastructuresParams]);

    return (
       <InfrastructureContext.Provider value={value}>
        {children}
       </InfrastructureContext.Provider>
    )
}
export default InfrastructureProvider;