/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

/* @ts-ignore */
const TokenContext = createContext();
/* @ts-ignore */

function TokenProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${(token)}`;
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  async function handleLogin(login:string, password:string) {
    const body = { login, password };
    const { data: { token } } = await api.post('/auth/login', body);
    localStorage.setItem('token', JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    return true;
  }
  async function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
  }

  return (
    <TokenContext.Provider value={{
      loading, authenticated, handleLogin, handleLogout,
    }}
    >
      {children}
    </TokenContext.Provider>
  );
}
export { TokenContext, TokenProvider };
