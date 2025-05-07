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
