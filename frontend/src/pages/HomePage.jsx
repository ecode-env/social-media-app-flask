import { useAuth } from '../hooks/useAuth';

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <h2>Welcome to the Social Media App</h2>
      {user ? (
        <p>Hello, {user.username}! Check out your feed.</p>
      ) : (
        <p>Please log in to see your personalized feed.</p>
      )}
    </div>
  );
}

export default HomePage;