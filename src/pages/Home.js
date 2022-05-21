import { useClientState } from '../contexts/ClientProvider';

export default function Info(){
    const {client, token} = useClientState();

    return(
        <>
            <p>Client: { JSON.stringify(client) } </p>
            <p>Token: { JSON.stringify(token) } </p>
        </>
    );
}