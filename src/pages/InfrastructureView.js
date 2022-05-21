import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useInstractureState } from '../contexts/InfrastructureProvider';


export default function InfrastructureView(){
    const {id} = useParams();
    const {infrastructures} = useInstractureState();
    const [infrastructure, setInfrastructure] = useState(infrastructures.filter(inf=>inf._id === id)[0]);

    return(
        <>
            <h1>{infrastructure.title}</h1>
            <pre>{ JSON.stringify(infrastructure, 2, ' ') }</pre>
        </>
    );
}