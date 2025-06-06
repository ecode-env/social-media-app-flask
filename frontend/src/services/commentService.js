import api from './api.js';


export const getCommentById = async (postId) => {
    try {
        const comments = await api.get(`comments/${postId}/comments`);
        return comments.data;
    }catch (e) {
        throw new Error('Could not get commentById');
    }
}