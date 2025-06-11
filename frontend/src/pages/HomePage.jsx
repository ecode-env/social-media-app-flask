import React from 'react';
import PostList from '../components/posts/PostList.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import './HomePage.css';

const HomePage = () => {
    const { user } = useAuth();

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

// import React from 'react';
// import { useAuth } from '../context/AuthContext.jsx';
//
// const HomePage = () => {
//     const { user } = useAuth();
//
//     return (
//         <div>
//             <h1>Welcome to e.on</h1>
//             {user ? (
//                 <p>Hello, @{user.username}! Email: {user.email}</p>
//             ) : (
//                 <p>Please log in to view your profile.</p>
//             )}
//         </div>
//     );
// };
//
// export default HomePage;