import { createContext, useState, useEffect } from 'react';
import api from '../services/api';


export const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setUser(response.data.user))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}