import { usePosts } from '../../../hooks/usePosts';
import { formatDate } from '../../../utils/helpers';
import { Heart, MessageCircle } from 'lucide-react';
import '../../../styles/postList.css';

function PostList() {
  const { posts, loading, error } = usePosts();

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="error">{error}</p>;
  if (posts.length === 0) return <p>No posts yet.</p>;

  return (
    <div className="post-list">
      <h2>Latest Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <div className="author-info">
              <img src={post.profile_picture || '/images/default-avatar.jpeg'} alt="Author" className="profile-pic" />
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
              Your browser does not support the video tag.
            </video>
          )}

          <div className="post-actions">
            <button className="action-btn">
              <MessageCircle size={16} />
              <span>{post.comment_count}</span>
            </button>
            <button className="action-btn">
              <Heart size={16} />
              <span>{post.like_count}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
