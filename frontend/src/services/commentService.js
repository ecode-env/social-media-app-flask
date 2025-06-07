import api from './api.js';


export const getCommentById = async (postId) => {
    try {
        const comments = await api.get(`comments/${postId}/comments`);
        return comments.data;
    }catch (e) {
        throw new Error('Could not get commentById');
    }
}

// Add a comment to a post
export const addComment = async (postId, comment) => {
    try {
        const response = await api.post(`/comments/${postId}/create-comment`, comment);
        return response.data;

    } catch (error) {
        throw error;
    }
};
