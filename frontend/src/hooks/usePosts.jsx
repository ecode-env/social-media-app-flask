import {useState, useEffect} from "react";
import { getPosts, getPostById } from '../services/postService';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getPosts();
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts([]);
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return { posts, loading, error };
}

export function useGetPosts(postId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getPostById(postId);
        console.log(data)
      }catch (e) {
        console.log(e)
        throw new  Error('Could not fetch posts', e);
      }
    }
  }, [])
  return { loading, error };
}
