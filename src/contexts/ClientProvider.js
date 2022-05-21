import { createContext, useContext, useState } from 'react';

export const ClientContext = createContext({
    token: null,
    setToken: (token) => {},

    client: null,
    setClient: (client) => {}
});
export const useClientState = () => useContext(ClientContext);

export function ClientProvider({children}){
    const [client, setClient] = useState(localStorage.client ? JSON.parse(localStorage.client) : null);
    const [token, setToken] = useState(localStorage.token ? JSON.parse(localStorage.token) : null);

    const value = {
        token,
        setToken: (token) => {
            localStorage.setItem("token", JSON.stringify(token));
            setToken(token)
        },

        client,
        setClient: (client) => {
            localStorage.setItem("client", JSON.stringify(client));
            setClient(client)
        },
    };

    return (
       <ClientContext.Provider value={value}>
        {children}
       </ClientContext.Provider>
    )
}
export default ClientProvider;