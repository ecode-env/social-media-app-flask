import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Heart, MessageSquare,SendHorizontal,Bookmark} from 'lucide-react';
import './PostList.css';
import { likePost} from '../../services/postService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import usePosts from "../../hooks/usePosts.jsx";

const PostList = () => {
    const [activeCommentPostId, setActiveCommentPostId] = useState(null);
    const [commentText, setCommentText] = useState('');
    const navigate = useNavigate();
    const {user} = useAuth()
    const {posts, setPosts,loading, error} = usePosts()
    const [isLiked, setLiked] = useState(false);


    const handleLike = async (postId, e) => {
        e.preventDefault();

        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const updatedPost = await likePost(postId);
            setPosts(posts.map(post =>
                post.id === postId ? { ...post, like_count: updatedPost.like_count } : post
            ));
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };

    const handleComment = (postId, e) => {
        e.preventDefault();
        setActiveCommentPostId(postId === activeCommentPostId ? null : postId);
        setCommentText('');
    };

    const handleSend = (postId) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setCommentText('');
        setActiveCommentPostId(null);
    };


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
                                    ? `${post.content.substring(0, 150)}... `
                                    : post.content
                                }
                                <Link to={`/posts/${post.id}`} className="read-more">
                                    Read more
                                </Link>
                            </p>
                        </div>

                        {post.media_url && post.media_type === 'image' && (
                            <div className="post-image-container">
                                <img
                                    src={post.media_url}
                                    alt={post.title}
                                    className="post-image"
                                />
                            </div>
                        )}

                        {post.media_url && post.media_type === 'video' && (
                            <div className="post-video-container">
                                <video
                                    src={post.media_url}
                                    controls
                                    className="post-video"
                                />
                            </div>
                        )}

                        {post.media_url && post.media_type === 'text' && (
                            <div className="post-text-container">
                                <pre className="post-text">{post.content}</pre>
                            </div>
                        )}

                        <div className="post-footer">
                            <div className="post-stats">
                                <button
                                    className={`like-button ${user in post.is_liked ? 'liked' : ''}`}
                                    onClick={(e) => handleLike(post.id, e)}
                                    aria-label="Like post"
                                >
                                    <Heart size={18} />
                                    <span>{post.like_count}</span>
                                </button>
                                <button
                                    className="comment-button"
                                    onClick={(e) => handleComment(post.id, e)}
                                    aria-label="Comment post"
                                >
                                    <MessageSquare size={18}/>
                                    <span>{post.comment_count}</span>
                                </button>
                            </div>

                        </div>
                        {activeCommentPostId === post.id && (
                            <div className="comment-box">
                              <input
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                  className="comment-textarea"
                                  placeholder="Write a comment..."
                              />
                                <button
                                    onClick={() => handleSend(post.id)}
                                    className="comment-send-button"
                                >
                                    <SendHorizontal size={18}/>
                                </button>
                            </div>
                        )}

                    </article>
                ))
            )}
        </div>
    );
};

export default PostList;