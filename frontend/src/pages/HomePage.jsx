import React from 'react';
import PostList from '../components/posts/PostList.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import './HomePage.css';

const HomePage = () => {
    const { user } = useAuth();

    return (
    <div className="home-page">
      <section className="posts-section">
          {user ? (
              <>
                  <p>Hello, @{user.username}!</p>
              </>
          ) : (
              <p>Please log in to view your profile.</p>
          )}
          <h2>Recent Posts</h2>
          <PostList />
      </section>
    </div>
  );
};

export default HomePage;