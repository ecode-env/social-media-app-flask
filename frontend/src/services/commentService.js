import api from './api.js'


export const getComments = async (PostId) => {
    try {
    const  res = await api.get('/comments/${PostId}/comments')
        return res.data
    }catch (e) {
        console.log(e);
        throw e;
    }
}

export const addComment = async (postId, content) => {
  try {
    const res = await api.post(`/comments/${postId}/create-comment`, { content });
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const deleteComment = async  (commentId) => {}