// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ThemeContext } from '../../context/ThemeContext';
import '../../styles/header.css'

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <h1>Social Media App</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <span className="welcome">Welcome, {user.username}</span>
            <button onClick={logout} className="btn logout">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn login">
            Login
          </Link>
        )}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="btn theme-toggle"
          aria-label="Toggle dark/light mode"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
);
}
