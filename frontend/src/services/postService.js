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

export const getPostById = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`)
    return response.data;
  } catch (e) {
    console.error('Error fetching posts:', e);
    throw e
  }
}

export const createPost = (data) => {

}