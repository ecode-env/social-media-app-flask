import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare } from 'lucide-react';
import './PostList.css';
import { fetchPosts, likePost } from '../../services/postService.js';
import Button from "../common/Button.jsx";



const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleLike = async (postId, e) => {
    e.preventDefault(); // Prevent navigation when clicking the like button
    try {
      const updatedPost = await likePost(postId);
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, like_count: updatedPost.like_count } : post
      ));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleComment = async (postId, e) =>  {
    e.preventDefault();
  }

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <div className="no-posts">No posts available</div>
      ) : (
        posts.map(post => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <img 
                src={post.profile_picture} 
                alt={post.fullName}
                className="author-avatar"
              />
              <div className="post-meta">
                <h4 className="author-name">{post.fullName}</h4>
                <time className="post-date">
                  {new Date(post.created_at).toLocaleDateString()}
                </time>
              </div>
            </div>
            <div className="post-content">
              <Link to={`/posts/${post.id}`} className="post-title-link">
                <h3 className="post-title">{post.title}</h3>
              </Link>
              <p className="post-excerpt">
                {post.content.length > 150
                    ? `${post.content.substring(0, 150)}...`
                    : post.content
                }
              </p>
            </div>

            {post.media_url && (
              <div className="post-image-container">
                <img 
                  src={post.media_url} 
                  alt={post.title}
                  className="post-image"
                />
              </div>
            )}

            <div className="post-footer">
              <div className="post-stats">
                <button 
                  className="like-button"
                  onClick={(e) => handleLike(post.id, e)}
                  aria-label="Like post"
                >
                  <Heart size={18} />
                  <span>{post.like_count}</span>
                </button>
                <Button
                    className="comment-button"
                    onClick={(e) => handleComment(post.id, e)}
                    aria-label="Comment post"
                >
                  <div className="comment-count">
                    <MessageSquare size={18} />
                    <span>{post.comment_count}</span>
                  </div>
                </Button>
              </div>
              <Link to={`/posts/${post.id}`} className="read-more">
                Read more
              </Link>
            </div>
          </article>
        ))
      )}
    </div>
  );
};

export default PostList;