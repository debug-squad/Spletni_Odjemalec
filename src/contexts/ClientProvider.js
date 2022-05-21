import { createContext, useContext, useState } from 'react';

export const ClientContext = createContext({
    client: null,
    setClient: (client) => {}
});
export const useClientState = () => useContext(ClientContext);

export function ClientProvider({children}){
    const [client, setClient] = useState(null);
    const value = {
        client,
        setClient: (client) => setClient(client),
    };

    return (
       <ClientContext.Provider value={value}>
        {children}
       </ClientContext.Provider>
    )
}
export default ClientProvider;