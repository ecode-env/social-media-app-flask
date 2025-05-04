import api from './api.js'

export const getPosts = async () => {
  try {
    const res = await api.get('/posts');
    return res.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
