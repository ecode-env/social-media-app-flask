// src/hooks/usePosts.jsx
import { useState, useEffect } from "react";
import { getPosts, getPostById } from "../services/postService";

/**
 * Fetches all posts.
 */
export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getPosts();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

/**
 * Fetches a single post by its ID.
 */
export function useGetPosts(postId) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!postId) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getPostById(postId);
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError(err?.message || "Could not fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [postId]);

  return { posts, loading, error };
}
