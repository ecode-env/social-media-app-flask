// src/components/layout/Header.jsx
import React, { useContext } from 'react';
import '../../styles/header.css';
import { Home, Search, Bell, MessageCircleMore, User, SunMoon } from 'lucide-react';
import logo from '../../../images/logo.png';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import { Link } from 'react-router-dom';

export default function Header() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          {/* Logo / Brand */}
          <div className="logo-wrapper">
            <Link to="/">
              <img src={logo} alt="SocialApp Logo" className="logo-img" />
            </Link>
          </div>

          {/* Search input */}
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
            />
          </div>

          {/* Icon actions with tooltips */}
          <div className="actions">
            <Link to="/" className="tooltip-wrapper">
              <button className="icon-btn" aria-label="Home">
                <Home size={20} />
              </button>
              <span className="tooltip">Home</span>
            </Link>

            <Link to="/messages" className="tooltip-wrapper">
              <button className="icon-btn" aria-label="Messages">
                <MessageCircleMore size={20} />
              </button>
              <span className="tooltip">Messages</span>
            </Link>

            <Link to="/notifications" className="tooltip-wrapper">
              <button className="icon-btn" aria-label="Notifications">
                <Bell size={20} />
              </button>
              <span className="tooltip">Notifications</span>
            </Link>

            <Link to="/profile" className="tooltip-wrapper">
              <button className="icon-btn" aria-label="Profile">
                <User size={20} />
              </button>
              <span className="tooltip">Profile</span>
            </Link>

            <div className="tooltip-wrapper">
              <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                <SunMoon size={20} />
              </button>
              <span className="tooltip">Toggle Theme</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
