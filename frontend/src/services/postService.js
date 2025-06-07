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
    // In a real app, this would be an API call
    // const response = await api.post('/posts', postData);
    // return response.data;
    
    // Mock implementation
    const newPost = {
      id: mockPosts.length + 1,
      ...postData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      comment_count: 0,
      like_count: 0,
      is_flagged: false
    };
    
    mockPosts.push(newPost);
    
    return Promise.resolve(newPost);
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

// Add a comment to a post
export const addComment = async (postId, comment) => {
  try {
    // In a real app, this would be an API call
    // const response = await api.post(`/posts/${postId}/comments`, comment);
    // return response.data;
    
    // Mock implementation
    const post = mockPosts.find(post => post.id === parseInt(postId));
    
    if (!post) {
      throw new Error('Post not found');
    }
    
    const newComment = {
      id: mockComments.length + 1,
      post_id: parseInt(postId),
      ...comment,
      created_at: new Date().toISOString()
    };
    
    mockComments.push(newComment);
    
    // Update comment count
    post.comment_count += 1;
    
    return Promise.resolve(newComment);
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