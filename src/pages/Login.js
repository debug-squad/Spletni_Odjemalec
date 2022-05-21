import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAxiosState } from '../contexts/AxiosProvider';
import { useClientState } from '../contexts/ClientProvider';

export default function Login(){
    const {client, setToken, setClient} = useClientState();
    const { publicAxios } = useAxiosState();

    const [clientName, setClientName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const Login = async () => {
        setError("");

        const response = await publicAxios.post('/client/login', {
            "client_name": clientName,
            "password": password
        });
        const data = response.data;

        if(data.success !== true) {
            setError("Failed to login");
            return;
        }

        setToken(data.data.token);
        setClient(data.data.client);
    };

    return(
        <div className="login">
            { client ? <Navigate to="/"/>: null}
            <h1>Login</h1>
            <input type="text" name="client_name" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" />
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Client Name" />
            { error ? <p> {error} </p> : null }
            <button onClick={Login}>Login</button>
        </div>
    );
}