import React, { useState, useEffect } from 'react';
import { Link, useNavigate }      from 'react-router-dom';
import { usePosts }                from '../../../hooks/usePosts';
import { useAuth }                 from '../../../hooks/useAuth.jsx';
import { likePost }                from '../../../services/likeService.js';
import { formatDate }              from '../../../utils/helpers';
import { Heart, MessageCircle }    from 'lucide-react';
import '../../../styles/postList.css';
import PostSideRight from "../../layout/PostSideRight.jsx";
import PostSideLeft  from "../../layout/PostSideLeft.jsx";

const PostList = () => {
  const { posts, loading, error } = usePosts();
  const { user }                 = useAuth();
  const navigate                  = useNavigate();
  const DEFAULT_AVATAR            = '/images/default-avatar.jpeg';

  const [localPosts, setLocalPosts] = useState([]);

  useEffect(() => {
    if (!posts) return;
    setLocalPosts(posts);
  }, [posts]);

  const handleLike = async (postId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const idx = localPosts.findIndex((p) => p.id === postId);
    if (idx < 0) return;

    // Optimistically update the UI
    const originalPosts = [...localPosts];
    setLocalPosts((prevPosts) =>
        prevPosts.map((post, index) =>
            index === idx
                ? {
                  ...post,
                  liked: !post.liked,
                  like_count: post.liked ? post.like_count - 1 : post.like_count + 1,
                }
                : post
        )
    );

    try {
      const data = await likePost(postId);
      // Confirm the update with backend data
      setLocalPosts((prevPosts) =>
          prevPosts.map((post, index) =>
              index === idx
                  ? {
                    ...post,
                    liked: data.message,
                    like_count: data.like_count,
                  }
                  : post
          )
      );
    } catch (err) {
      console.error('Error toggling like:', err);
      // Revert to original state on error
      setLocalPosts(originalPosts);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error)   return <div>Error: {error}</div>;

  return (
      <div className="post-list-container">
        <PostSideLeft />
        <div className="post-list-main">
          {localPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <img

                      src={post.profile_picture || DEFAULT_AVATAR}
                      alt="Profile"
                      className="avatar"
                  />
                  <div className="post-meta">
                    <Link to={`/profile/${post.author}`} className="username">
                      {post.author}
                    </Link>
                    <span className="fullName">{post.fullName}</span>
                    <span className="date">{formatDate(post.created_at)}</span>
                  </div>
                </div>

                <div className="post-content">
                  {post.title && <h3>{post.title}</h3>}
                  <Link to="" className="none-link">
                    <p>
                      {post.content
                          ? post.content.split(' ').length > 100
                              ? post.content.split(' ').slice(0, 100).join(' ') + '... See More'
                              : post.content
                          : ''}
                    </p>
                  </Link>
                  {post.media_url && (
                      <>
                        {post.media_type === 'image' && (
                            <img
                                src={post.media_url}
                                alt="Post Media"
                                className="post-image"
                            />
                        )}
                        {post.media_type === 'video' && (
                            <video className="post-video" controls>
                              <source src={post.media_url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                        )}
                      </>
                  )}

                  {post.is_flagged && <span className="flagged">Flagged Content</span>}
                </div>

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