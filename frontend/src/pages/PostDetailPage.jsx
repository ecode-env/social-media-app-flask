import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import { Heart, Send } from 'lucide-react';
import Button from '../components/common/Button';
import './PostDetailPage.css';
import { fetchPostById, likePost } from '../services/postService';
import { addComment } from '../services/commentService.js'
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from '../assets/images/Avatar.png';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentLength, setCommentLength] = useState(0)
  const { isAuthenticated, user } = useAuth();
  const isLoggedIn = isAuthenticated;

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPostById(id);
        setPost(data);
        setComments(data.comments || []);
        setCommentLength(data.comment_count || 0)
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleLike = async () => {
    if (!isLoggedIn) return;

    // Optimistic update
    const alreadyLiked = post.is_liked?.includes(user.id);
    const newIsLiked = alreadyLiked
        ? post.is_liked.filter(id => id !== user.id)
        : [...(post.is_liked || []), user.id];

    const newLikeCount = alreadyLiked
        ? post.like_count - 1
        : post.like_count + 1;

    setPost(prev => ({
      ...prev,
      like_count: newLikeCount,
      is_liked: newIsLiked,
    }));

    try {
      const updatedPost = await likePost(id);
      // sync with backend response
      setPost(prev => ({
        ...prev,
        like_count: updatedPost.like_count,
      }));
    } catch (err) {
      console.error("Error liking post:", err);
      // rollback optimistic update
    }
  };


  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim() || !isLoggedIn) return;

    const trimmedComment = comment.trim();
    const tempId = `temp-${Date.now()}`;

    const optimisticComment = {
      id: tempId,
      content: trimmedComment,
      user: {
        id: user.id,
        username: user.username,
      },
      created_at: new Date().toISOString(),
    };
    setCommentLength(prev => prev + 1);
    setComments(prev => [...prev, optimisticComment]);
    setComment('');
    setPost(prev => ({ ...prev, comment_count: prev.comment_count + 1 }));

    // Step 2: Send to server in background
    try {
      const realComment = await addComment(id, {
        user_id: user.id,
        content: trimmedComment,
        post_id: id,
      });

      // Step 3: Replace temp comment with real one
      setComments(prev =>
          prev.map(c => (c.id === tempId ? realComment : c))
      );
    } catch (err) {
      console.error("Error adding comment:", err);

      // Optionally: remove the optimistic comment on error
      setComments(prev => prev.filter(c => c.id !== tempId));
      setPost(prev => ({ ...prev, comment_count: prev.comment_count - 1 }));
    }
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!post) {
    return <div className="not-found">Post not found</div>;
  }

  return (
      <div className="post-detail">
        <article className="post">
          <div className="post-header">
            <img
                src={post.profile_picture || Avatar}
                alt={post.fullName}
                className="author-avatar"
            />
            <div className="post-meta">
              <Link to={post.author ? `/user/${post.author}` : '#'} className="author-name">{post.fullName}</Link>
              <time className="post-date">
                {new Date(post.created_at).toLocaleDateString()}
              </time>
            </div>
          </div>

          {post.title && (
              <h1 className="post-title">{post.title}</h1>
          )}

          {post.media_url && (
              <div className="post-image-container">
                <img
                    src={post.media_url}
                    alt={post.title}
                    className="post-image"
                />
              </div>
          )}

          {post.content && (
              <div className="post-content">
                <p>{post.content}</p>
              </div>
          )}

          <div className="post-actions">
            <button
                className={`like-button ${post.is_liked?.includes(user.id) ? 'liked' : ''}`}
                onClick={handleLike}
                disabled={!isLoggedIn}
            >
              <Heart size={20} />
              <span>{post.like_count} likes</span>
            </button>

          </div>
        </article>

        <section className="comments-section">
          <h2>Comments ({commentLength})</h2>

          {isLoggedIn ? (
              <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
            />
                <Button
                    type="submit"
                    variant="primary"
                    disabled={!comment.trim()}
                >
                  <Send size={16} />
                  <span className='gap-btn'>Post Comment</span>
                </Button>
              </form>
          ) : (
              <div className="login-prompt">
                <p>Please <a href="/login">login</a> to add a comment</p>
              </div>
          )}

          <div className="comments-list">
            {comments.length === 0 ? (
                <p className="no-comments">No comments yet</p>
            ) : (
                comments.map((comment, index) => (
                    <div key={comment.id || index} className="comment">
                      <div className="comment-header">
                        <img
                            src={comment.profile_picture || Avatar}
                            alt={comment.fullName || comment.author}
                            className="comment-avatar"
                        />
                        <div className="comment-meta">
                          <span className="comment-author">{comment.fullName || comment.author}</span>
                          <time className="comment-date">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                      <p className="comment-content">{comment.content}</p>
                    </div>
                ))
            )}
          </div>
        </section>
      </div>
  );
};

export default PostDetailPage;