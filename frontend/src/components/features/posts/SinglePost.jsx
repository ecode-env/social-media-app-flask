import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDate } from '../../../utils/helpers';
import '../../../styles/postList.css';
import {getPostById} from "../../../services/postService.js";


export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPostData() {
      try {
        const postRes = getPostById(id);
        const postData = await postRes.data;
        setPost(postData);

        const commentsRes = await fetch(`/api/posts/${id}/comments`);
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPostData();
  }, [id]);

  const submitComment = async (e) => {
    e.preventDefault();
    const text = newComment.trim();
    if (!text) return;
    try {
      const res = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      });
      const saved = await res.json();
      setComments(prev => [...prev, saved]);
      setNewComment('');
    } catch {
      console.error('Comment submit failed');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="post-page">
      <div className="post-side-left">Left Sidebar</div>

      <div className="post-list">
        <Link to="/" className="read-more">Back to Posts</Link>
        <div className="post-card">
          <div className="post-header">
            <div className="author-info">
              <span className="author">@{post.author}</span>
            </div>
            <small className="date">{formatDate(post.created_at)}</small>
          </div>

          {post.title && <h3 className="post-title">{post.title}</h3>}
          <p className="post-content">{post.content}</p>

          {post.media_type === 'image' && (
            <img src={post.media_url} alt="Post media" className="post-media" />
          )}
          {post.media_type === 'video' && (
            <video controls className="post-media">
              <source src={post.media_url} type="video/mp4" />
            </video>
          )}

          <h3>Comments</h3>
          <form onSubmit={submitComment} className="comment-form">
            <input
              type="text"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
            />
            <button type="submit" className="comment-submit-btn">Post</button>
          </form>
          <ul className="comment-list">
            {comments.map((c, idx) => (
              <li key={idx} className="comment-item">
                <span className="comment-text">{c.content || c.text}</span>
                <small className="comment-date">{formatDate(c.created_at)}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="post-side-right">Right Sidebar</div>
    </div>
  );
}