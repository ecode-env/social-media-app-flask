import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../../../hooks/usePosts';
import { formatDate } from '../../../utils/helpers';
import { Heart, MessageCircle } from 'lucide-react';
import '../../../styles/postList.css';
import PostSideRight from "../../layout/PostSideRight.jsx";
import PostSideLeft  from "../../layout/PostSideLeft.jsx";

const PostList = () => {
  const { posts, loading, error } = usePosts();
  const { user }                 = useAuth();
  const navigate                  = useNavigate();
  const DEFAULT_AVATAR            = '/images/default-avatar.jpeg';


  const toggleComments = async (postId) => {
    const isOpen = showComments[postId];
    setShowComments(prev => ({ ...prev, [postId]: !isOpen }));
    if (!isOpen && !commentsData[postId]) {
      try {
        const res = await api.get(`/posts/${postId}/comments`);
        setCommentsData(prev => ({ ...prev, [postId]: res.data }));
      } catch {
        console.error('Failed to load comments');
      }
    }
  };

  const submitComment = async (e, postId) => {
    e.preventDefault();

     if (!user) {
    navigate('/login');
    return;
  }

    const text = newComment[postId]?.trim();
    if (!text) return;
    try {
      const res = await api.post(`/posts/${postId}/create-comment`, { content: text });
      setCommentsData(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), res.data]
      }));
      setNewComment(prev => ({ ...prev, [postId]: '' }));
      setShowComments(prev => ({ ...prev, [postId]: true }));
    } catch {
      console.error('Comment submit failed');
    }
  };


  return (
    <div className="post-page">
      <div className="post-side-left">Left Sidebar</div>

      <div className="post-list">
        <h2>Latest Posts</h2>
        {posts.map(post => (
          <div
            key={post.id}
            className={`post-card${showComments[post.id] ? ' expanded' : ''}`}
          >
            <div className="post-header">
              <div className="author-info">
                <img
                  src={post.profile_picture || DEFAULT_AVATAR}
                  alt={post.author}
                  className="profile-pic"
                />
                <span className="author">@{post.author}</span>
              </div>
              <small className="date">{formatDate(post.created_at)}</small>
            </div>

            {post.title && <h3 className="post-title">{post.title}</h3>}
            <Link to={`/posts/${post.id}`} className='non-link' >
                <p className="post-content">
              {truncateContent(post.content)}
              <p className="read-more"> Read More</p>
            </p>
            </Link>

            {post.media_type === 'image' && (
              <img src={post.media_url} alt="Post media" className="post-media" />
            )}
            {post.media_type === 'video' && (
              <video controls className="post-media">
                <source src={post.media_url} type="video/mp4" />
              </video>
            )}

            <div className="post-actions">
              <button className="action-btn" onClick={() => toggleComments(post.id)}>
                <MessageCircle size={16} /> <span>{post.comment_count}</span>
              </button>
              <button className="action-btn">
                <Heart size={16} /> <span>{post.like_count}</span>
              </button>
            </div>

            <div className="comment-section">
              <form onSubmit={e => submitComment(e, post.id)} className="comment-form">
                <input
                  type="text"
                  value={newComment[post.id] || ''}
                  onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                  placeholder="Write a comment..."
                  className="comment-input"
                />
                <button type="submit" className="comment-submit-btn">Post</button>
              </form>
              <ul className="comment-list">
                {(commentsData[post.id] || []).map((c, idx) => (
                  <li key={idx} className="comment-item">
                    <span className="comment-text">{c.content || c.text}</span>
                    <small className="comment-date">{formatDate(c.created_at)}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="post-side-right">Right Sidebar</div>
    </div>
  );
}