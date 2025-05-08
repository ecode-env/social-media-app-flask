import { useAuth } from '../hooks/useAuth';
import PostList from "../components/features/posts/PostList.jsx";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      {user ? (
        <>
          <p>Hello, {user.username}!</p>
          <PostList />
        </>
      ) : (
        <>
          <p>Please log in to see your personalized feed.</p>
          <PostList />
        </>
      )}
    </div>
  );
}

export default HomePage;