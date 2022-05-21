import { useClientState } from '../contexts/ClientProvider';
import { useEventState } from '../contexts/EventProvider';
import { useInstractureState } from '../contexts/InfrastructureProvider';

export default function Info(){
    const {client, token} = useClientState();
    const {events} = useEventState();
    const {infrastructures} = useInstractureState();

    return(
        <>
            <p>Client: { JSON.stringify(client) } </p>
            <p>Token: { JSON.stringify(token) } </p>

            <p>Events: { JSON.stringify(events) } </p>
            <p>Infrastructures: { JSON.stringify(infrastructures) } </p>
        </>
    );
}