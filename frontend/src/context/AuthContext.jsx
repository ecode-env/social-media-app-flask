import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // define an async function inside useEffect
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await api.get(
          '/auth/me',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setUser(response.data.user);
      } catch (error) {
        // token invalid or request failed
        localStorage.removeItem('token');
      }
    };

    // call it immediately
    loadUser();
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}