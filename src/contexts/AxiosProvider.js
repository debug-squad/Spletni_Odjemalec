import React, {createContext, useContext} from 'react';
import axios from 'axios';
import { ClientContext } from './ClientProvider';

export const AxiosContext = createContext({
  authAxios: null,
  publicAxios: null,
});
export const useAxiostState = () => useContext(AxiosContext);

export const AxiosProvider = ({children}) => {
  const authContext = useContext(ClientContext);

  const authAxios = axios.create({
    baseURL: 'http://localhost:3000/',
  });

  const publicAxios = axios.create({
    baseURL: 'http://localhost:3000/',
  });

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

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
