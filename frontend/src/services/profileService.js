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
