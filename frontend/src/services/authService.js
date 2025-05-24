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
    // In a real app, this would be an API call
    // const response = await api.post('/auth/register', userData);
    // return response.data;
    
    // Mock implementation for local development
    const existingUser = mockUsers.find(user => 
      user.email === userData.email || user.username === userData.username
    );
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create a new user
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      profile_picture_url: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg'
    };
    
    // Add to mock users (in a real app, this would be saved to a database)
    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Create a mock token
    const token = `mock-jwt-token-${newUser.id}`;
    
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


// Get current user function
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};