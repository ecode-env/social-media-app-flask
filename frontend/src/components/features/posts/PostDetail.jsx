import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/helpers';
import { Heart, MessageCircle, Send } from 'lucide-react';
import '../../../styles/postDetail.css';
import { useGetPosts } from '../../../hooks/usePosts.jsx'
import { AuthContext } from '../../../context/AuthContext';
import PostSideRight from "../../layout/PostSideRight.jsx";
import PostSideLeft from "../../layout/PostSideLeft.jsx";

const PostDetail = () => {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await useGetPosts(postId);
        setPost(response);
        setComments(response.comments || []);
        setLiked(response.likedByUser || false);
        setLoading(false);
      } catch (err) {
        setError('Failed to load post');
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    try {
      await api.post(`/posts/${postId}/like`);
      setLiked(true);
      setPost((prev) => ({ ...prev, like_count: prev.like_count + 1 }));
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await api.post(`/posts/${postId}/comments`, { content: newComment });
      setComments((prev) => [...prev, response.data]);
      setPost((prev) => ({ ...prev, comment_count: prev.comment_count + 1 }));
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
      <div className="post-detail-container">
        <PostSideLeft />
        <div className="post-detail-main">
          <div className="post-detail-card">
            <div className="post-header">
              <img src={post.profile_picture} alt="Profile" className="avatar" />
              <div className="post-meta">
                <Link to={`/profile/${post.author}`} className="username">
                  {post.author}
                </Link>
                <span className="date">{formatDate(post.created_at)}</span>
              </div>
            </div>
            <div className="post-content">
              {post.title && <h3>{post.title}</h3>}
              <p>{post.content}</p>
              {post.media_url && (
                  <>
                    {post.media_type === 'image' && (
                        <img src={post.media_url} alt="Post Media" className="post-image" />
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
              <button
                  onClick={handleLike}
                  className={`action-btn ${liked ? 'liked' : ''}`}
                  disabled={liked}
              >
                <Heart size={20} />
                <span>{post.like_count}</span>
              </button>
              <button className="action-btn">
                <MessageCircle size={20} />
                <span>{post.comment_count}</span>
              </button>
            </div>
          </div>
          <div className="comments-section">
            <h4>Comments</h4>
            <div className="new-comment">
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows="2"
            />
              <button onClick={handleCommentSubmit} className="comment-btn">
                <Send size={20} />
              </button>
            </div>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-header">
                        <img src={comment.author.profile_picture} alt="Profile" className="comment-avatar" />
                        <div className="comment-meta">
                          <Link to={`/profile/${comment.author.username}`} className="comment-username">
                            {comment.author.username}
                          </Link>
                          <span className="comment-date">{formatDate(comment.created_at)}</span>
                        </div>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
          </div>
        </div>
        <PostSideRight />
      </div>
  );
};

export default PostDetail;