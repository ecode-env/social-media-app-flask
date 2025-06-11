import { useEffect, useState } from "react";
import { editProfile, fetchProfile } from "../services/profileService";

const useProfile = (username) => {
    const [ profile, setProfile ] = useState(null);
    const [ loading, setLoading] = useState(true);
    const [ error, setError] = useState(null);

    useEffect(() => {
        if (!username) {
            console.warn("No username provided");
            setLoading(false);
            return;
        }

        const loadProfile = async () => {
            try {
                const data = await fetchProfile(username);
                setProfile(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [username]);

    return { profile, loading, error };
};

export { useProfile };
