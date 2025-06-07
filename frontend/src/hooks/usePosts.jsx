import { useState, useEffect } from "react";
import { fetchPosts } from "../services/postService.js";
import { useAuth } from "../context/AuthContext.jsx";

const usePosts = ({ filterByUser = false, userId = null }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();

                const filteredPosts = filterByUser
                    ? data.filter(post => post.user_id === (userId || user?.id))
                    : data;

                setPosts(filteredPosts);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [filterByUser, userId, user]);

    return { loading, posts,setPosts ,error };
};

export default usePosts;
