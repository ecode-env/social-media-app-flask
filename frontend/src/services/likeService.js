import api from './api.js'


export async function likePost(postId) {
    try {
        const response = await api.post(`/posts/${postId}/like`);
        return response.data;
    } catch (error) {
        throw new Error('Error liking the post: ' + error.message);
    }
}

export async function unlikePost(postId) {
    try {
        const response = await api.post(`/posts/${postId}/like`);
        return response.data;
    } catch (error) {
        throw new Error('Error unliking the post: ' + error.message);
    }
}