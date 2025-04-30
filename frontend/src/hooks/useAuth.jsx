import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, setUser } = context;


  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user } = response.data;
      localStorage.setItem('token', access_token);
      setUser(user);
      return user;
    } catch (error) {
      console.log(error.response?.data?.message)
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { access_token, user } = response.data;
      localStorage.setItem('token', access_token);
      setUser(user);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, login, register ,logout };
}