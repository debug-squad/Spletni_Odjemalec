import React, {createContext, useContext, useEffect} from 'react';
import axios from 'axios';
import { useClientState } from './ClientProvider';

export const AxiosContext = createContext({
  authAxios: null,
  publicAxios: null,
});
export const useAxiosState = () => useContext(AxiosContext);

export const AxiosProvider = ({children}) => {
  const { token, setClient } = useClientState();

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_ENV === 'production' ? "https://mb-hub.herokuapp.com/" : 'http://localhost:3000/',
  });
  const publicAxios = axios.create({
    baseURL: process.env.REACT_APP_ENV === 'production' ? "https://mb-hub.herokuapp.com/" : 'http://localhost:3000/',
  });

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  useEffect(()=> {
    (async ()=> {
      if(!token) return;
      const response = await authAxios.get('/client/profile');
      const client = response.data;
      setClient(client);
    })();
  }, [token]);

  return (
    <AxiosContext.Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </AxiosContext.Provider>
  );
};
export default AxiosProvider;
