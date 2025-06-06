import api from './api.js';

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    user_id: 1,
    profile_picture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    title: "Getting Started with React",
    content: "React is a popular JavaScript library for building user interfaces. In this post, we'll explore the basics of React and how to create your first component.",
    media_type: "video",
    media_url: "https://youtu.be/uxjhN_Donfw.mp4",
    post_type: "article",
    fullName: "John Doe",
    is_flagged: false,
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2023-01-15T10:30:00Z",
    author: "johndoe",
    comment_count: 5,
    like_count: 12,
    is_liked: true,
  },
  {
    id: 2,
    user_id: 2,
    profile_picture: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    title: "CSS Grid Layout: A Complete Guide",
    content: "CSS Grid Layout is a two-dimensional layout system designed for user interface design. In this guide, we'll cover everything you need to know about CSS Grid.",
    media_type: "image",
    media_url: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
    post_type: "tutorial",
    fullName: "Jane Doe",
    is_flagged: false,
    created_at: "2023-01-20T14:45:00Z",
    updated_at: "2023-01-21T09:15:00Z",
    author: "janedoe",
    comment_count: 8,
    like_count: 24,
    is_liked: true,
  },
  {
    id: 3,
    user_id: 1,
    profile_picture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    title: "JavaScript Async/Await Explained",
    content: "Async/await is a modern way to handle asynchronous operations in JavaScript. This post explains how it works with practical examples.",
    media_type: "image",
    media_url: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
    post_type: "article",
    fullName: "John Doe",
    is_flagged: false,
    created_at: "2023-02-05T16:20:00Z",
    updated_at: "2023-02-05T16:20:00Z",
    author: "johndoe",
    comment_count: 3,
    like_count: 9,
    is_liked: false,
  },
  {
    id: 4,
    user_id: 2,
    profile_picture: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    title: "Introduction to TypeScript",
    content: "TypeScript is a strongly typed programming language that builds on JavaScript. Learn why you should consider using TypeScript in your next project.",
    media_type: "image",
    media_url: "https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg",
    post_type: "tutorial",
    fullName: "Jane Doe",
    is_flagged: false,
    created_at: "2023-02-12T11:10:00Z",
    updated_at: "2023-02-13T09:25:00Z",
    author: "janedoe",
    comment_count: 6,
    like_count: 18,
    is_liked: false,
  }
];

// Mock comments data
const mockComments = [
  {
    id: 1,
    post_id: 1,
    user_id: 2,
    content: "Great introduction to React! Looking forward to more articles like this.",
    created_at: "2023-01-15T14:25:00Z",
    author: "janedoe",
    fullName: "Jane Doe",
    profile_picture: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 2,
    post_id: 1,
    user_id: 1,
    content: "Thanks for the feedback! I'm planning to write more about React hooks next.",
    created_at: "2023-01-15T15:30:00Z",
    author: "johndoe",
    fullName: "John Doe",
    profile_picture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  },
  {
    id: 3,
    post_id: 2,
    user_id: 1,
    content: "This is exactly what I needed to understand CSS Grid better. Thank you!",
    created_at: "2023-01-20T16:40:00Z",
    author: "johndoe",
    fullName: "John Doe",
    profile_picture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  }
];

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