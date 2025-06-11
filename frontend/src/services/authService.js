import api from './api.js';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { user, access_token } = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', access_token);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Login failed';
    throw new Error(message);
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    const { user, access_token } = response.data;

    // Store user data and token in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', access_token);

    return { user, access_token };
  } catch (error) {
    const message =
        error.response?.data?.message || error.message || 'Registration failed';
    throw new Error(message);
  }
};



// Get current user function
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};