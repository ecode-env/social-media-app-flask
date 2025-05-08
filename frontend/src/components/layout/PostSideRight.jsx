import React from 'react';
import '../../styles/postSide.css';

const PostSideRight = () => {
  return (
    <div className="post-side-right">
      <div className="sidebar-section">
        <h3>What's happening</h3>
        <div className="trending-item">
          <p>Paris Saint-Germain vs Arsenal FC</p>
          <span>LIVE</span>
        </div>
        <div className="trending-item">
          <p>Trending - Gemini 2.5 Pro</p>
          <span>67.1K posts</span>
        </div>
        <div className="trending-item">
          <p>Trending in Ethiopia - THgray</p>
          <span>31.2K posts</span>
        </div>
        <div className="trending-item">
          <p>Trending - May God</p>
          <span>48K posts</span>
        </div>
        <div className="trending-item">
          <p>Politics - Somalia parliament</p>
          <span>72.1K posts</span>
        </div>
        <a href="#" className="show-more">Show more</a>
      </div>
      <div className="sidebar-section">
        <h3>Who to follow</h3>
        <div className="follow-item">
          <img src="https://via.placeholder.com/40" alt="Avatar" className="follow-avatar" />
          <div className="follow-info">
            <p>Ujjwal Chadha</p>
            <span>@ujjwalscript</span>
          </div>
          <button className="follow-btn">Follow</button>
        </div>
        <div className="follow-item">
          <img src="https://via.placeholder.com/40" alt="Avatar" className="follow-avatar" />
          <div className="follow-info">
            <p>Universe Vibe</p>
            <span>@universevibe</span>
          </div>
          <button className="follow-btn">Follow</button>
        </div>
        <a href="#" className="show-more">Show more</a>
      </div>
    </div>
  );
};

export default PostSideRight;