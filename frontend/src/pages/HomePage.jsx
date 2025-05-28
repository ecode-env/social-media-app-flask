import React from 'react';
import PostList from '../components/posts/PostList.jsx';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="posts-section">
        <h2>Recent Posts</h2>
        <PostList />
      </section>
    </div>
  );
};

export default HomePage;