import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/helpers';
import {Heart, MessageCircle, Send} from 'lucide-react';
import '../../../styles/postDetail.css';
import { useGetPosts } from '../../../hooks/usePosts.jsx';
import { AuthContext } from '../../../context/AuthContext';
import api from '../../../services/api';
import PostSideRight from '../../layout/PostSideRight.jsx';
import PostSideLeft from '../../layout/PostSideLeft.jsx';
import Loader from '../../common/Loader.jsx';

const PostDetail = () => {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // fetch the single post
  const { posts: post, loading, error } = useGetPosts(postId);

  // local UI state for comments & likes
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  // when `post` arrives, initialize local state
  useEffect(() => {
    if (post) {
      setComments(post.comments || []);
      setLikeCount(post.like_count || 0);
      setCommentCount(post.comment_count || 0);
      // if your API returns whether the current user already liked:
      // setLiked(post.likedByUser || false);
    }
  }, [post]);

  const handleLike = async () => {
    try {
      await api.post(`/posts/${postId}/like`);
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleCommentSubmit = async () => {
    const content = newComment.trim();
    if (!content) return;

    try {
      const response = await api.post(`/posts/${postId}/comments`, { content });
      // assuming response.data is the new comment object
      setComments((prev) => [...prev, response.data]);
      setCommentCount((prev) => prev + 1);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  if (loading) return <div><Loader /></div>;
  if (error)   return <div>Error: {error}</div>;
  if (!post)   return <div>Post not found</div>;

  return (
      <div className="post-detail-container">
        <PostSideLeft />

        <div className="post-detail-main">
          <div className="post-detail-card">
            <div className="post-header">
              <img
                  src={post.profile_picture}
                  alt="Profile"
                  className="avatar"
              />
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

              {post.is_flagged && (
                  <span className="flagged">Flagged Content</span>
              )}
            </div>

            <div className="post-actions">
              <button
                  onClick={handleLike}
                  className={`action-btn ${liked ? 'liked' : ''}`}
                  disabled={liked}
              >
                <Heart size={20} />
                <span>{likeCount}</span>
              </button>

              <button className="action-btn">
                <MessageCircle size={20} />
                <span>{commentCount}</span>
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
                <Send size={30} />
              </button>
            </div>

            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-header">
                        <img
                            src={comment.author.profile_picture}
                            alt="Profile"
                            className="comment-avatar"
                        />
                        <div className="comment-meta">
                          <Link
                              to={`/profile/${comment.author.username}`}
                              className="comment-username"
                          >
                            {comment.author.username}
                          </Link>
                          <span className="comment-date">
                      {formatDate(comment.created_at)}
                    </span>
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
