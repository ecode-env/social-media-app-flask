import api from './api.js';

// Define mock users for local development
const mockUsers = [
  {
    id: 1,
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123', // In a real app, never store plain text passwords!
    f_name: 'John',
    l_name: 'Doe',
    profile_picture_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    id: 2,
    username: 'janedoe',
    email: 'jane@example.com',
    password: 'password123',
    f_name: 'Jane',
    l_name: 'Doe',
    profile_picture_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
  }
];

// Login function
export const login = async (email, password) => {
  try {
    // In a real app, this would be an API call
    // const response = await api.post('/auth/login', { email, password });
    // return response.data;
    
    // Mock implementation for local development
    const user = mockUsers.find(user => 
      user.email === email && user.password === password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    
    // Create a mock token
    const token = `mock-jwt-token-${user.id}`;
    
    // Store user data and token in localStorage
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('token', token);
    
    return {
      user: userWithoutPassword,
      token
    };
  } catch (error) {
    throw error;
  }
};

// Register function
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