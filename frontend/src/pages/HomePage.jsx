import React from 'react';
import PostList from '../components/posts/PostList.jsx';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to e.on</h1>
          <p>Connect with others and share your thoughts</p>
        </div>
      </section>
      
      <section className="posts-section">
        <h2>Recent Posts</h2>
        <PostList />
      </section>
    </div>
  );
};

export default HomePage;