import api from './api.js';

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;

  } catch (error) {
    throw error;
  }
};

// Fetch a post by ID
export const fetchPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new post
export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts/create-post', postData);

    return response.data;

  } catch (error) {
    throw error;
  }
};

// Update a post
export const updatePost = async (id, postData) => {
  try {
    // In a real app, this would be an API call
    // const response = await api.put(`/posts/${id}`, postData);
    // return response.data;
    
    // Mock implementation
    const postIndex = mockPosts.findIndex(post => post.id === parseInt(id));
    
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    
    mockPosts[postIndex] = {
      ...mockPosts[postIndex],
      ...postData,
      updated_at: new Date().toISOString()
    };
    
    return Promise.resolve(mockPosts[postIndex]);
  } catch (error) {
    throw error;
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    // In a real app, this would be an API call
    // const response = await api.delete(`/posts/${id}`);
    // return response.data;
    
    // Mock implementation
    const postIndex = mockPosts.findIndex(post => post.id === parseInt(id));
    
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    
    const deletedPost = mockPosts.splice(postIndex, 1)[0];
    
    return Promise.resolve(deletedPost);
  } catch (error) {
    throw error;
  }
};


// Like a post
export const likePost = async (postId) => {
  try {
    // In a real app, this would be an API call
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    throw new error;
  }
};