import { useState } from 'react';
import { likePost, unlikePost } from '../services/likeService.js';

export function useLike(initialLiked = false, postId) {
    const [liked, setLiked] = useState(initialLiked);
    const [loading, setLoading] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const toggleLike = async () => {
        setLoading(true);
        try {
            const result = await (liked ? unlikePost(postId) : likePost(postId));
            setLiked(!liked);
            setLikeCount(result.like_count);
        } catch (error) {
            console.error('Failed to toggle like:', error);
        } finally {
            setLoading(false);
        }
    };

    return { liked, toggleLike, loading, likeCount };
}
