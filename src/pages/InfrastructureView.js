import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useInstractureState } from '../contexts/InfrastructureProvider';
import { useAxiosState } from '../contexts/AxiosProvider';


export default function InfrastructureView(){
    const {publicAxios} = useAxiosState();

    const {id} = useParams();
    const {infrastructures} = useInstractureState();
    const [infrastructure, setInfrastructure] = useState(infrastructures.filter(inf=>inf._id === id)?.[0]);

    useEffect(()=>{
        (async ()=> {
            const req = await publicAxios.get('/infrastructure/' + id);
            const infrastructure = req.data;
            setInfrastructure(infrastructure);
        })()
    }, [id]);

    return (infrastructure ? <>
        <h1>{infrastructure.title}</h1>
        <pre>{ JSON.stringify(infrastructure, 2, ' ') }</pre>
    </>: <span>Loading...</span>);
}