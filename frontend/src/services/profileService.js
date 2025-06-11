import api from './api.js';

export const fetchProfile = async (username) => {
    if (!username) {
        console.warn("No username provided");
        return;
    }

    try {
        const res = await api.get(`/users/${username}`);
        return res.data;
    } catch (e) {
        console.error("Error fetching profile:", e.message);
        throw e;
    }
};

export const editProfile =  async (username, new_profile) => {
    if (!username) {
        console.warn("No username provided");
        return;
    }
    try {
        const res = await api.put(`/users/${username}`, new_profile);
        return res.data;

    } catch (e) {
        throw e.message;
    }
}