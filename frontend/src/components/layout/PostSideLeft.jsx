import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Bell, Mail, Bot, List, Bookmark, Briefcase, Users, User, MoreHorizontal, Menu } from 'lucide-react';
import '../../styles/postSide.css';


const PostSideLeft = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="post-side-left">
      <button className="menu-toggle" onClick={toggleMenu}>
        <Menu size={24} />
      </button>
      <div className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-item">
          <Link to="/" className="sidebar-link">
            <Home size={20} />
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/explore" className="sidebar-link">
            <Compass size={20} />
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/notifications" className="sidebar-link">
            <Bell size={20} />
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/messages" className="sidebar-link">
            <Mail size={20} />
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/grok" className="sidebar-link">
            <Bot size={20} />
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/lists" className="sidebar-link">
            <List size={20} />
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/bookmarks" className="sidebar-link">
            <Bookmark size={20} />
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/jobs" className="sidebar-link">
            <Briefcase size={20} />
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/communities" className="sidebar-link">
            <Users size={20} />
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/profile" className="sidebar-link">
            <User size={20} />
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/more" className="sidebar-link">
            <MoreHorizontal size={20} />
          </Link>
        </div>
        <button className="post-btn">Post</button>
      </div>
    </div>
  );
};

export default PostSideLeft;