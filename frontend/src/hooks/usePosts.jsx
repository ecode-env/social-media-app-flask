import { useState, useEffect } from "react";
import { fetchPosts } from "../services/postService.js";

const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const getPosts = await fetchPosts();
                setPosts(getPosts);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    return { loading, posts,setPosts ,error };
};

export default usePosts;
