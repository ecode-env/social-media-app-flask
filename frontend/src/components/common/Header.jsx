import React from 'react';
import {NavLink, Link, useNavigate} from 'react-router-dom';
import { Moon, Sun, Bell, MessageSquare, UserCircle, PlusSquare,Home, LogOut } from 'lucide-react';
import './Header.css';
import { useTheme } from '../../hooks/useTheme.jsx';
import {useAuth} from "../../context/AuthContext.jsx";
import Button from "./Button.jsx";
import {notifySuccess} from '../../utils/toast.js'

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = () => navigate('/register');
  const handleLogin = () => navigate('/login');
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    notifySuccess('User logged out!');
    navigate('/login');
    setUser(null)
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <NavLink to="/">e.on</NavLink>
        </div>
        
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                <Home size={20}/>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/create-post" className={({ isActive }) => isActive ? 'active' : ''}>
                <PlusSquare size={20} />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/notifications" className={({ isActive }) => isActive ? 'active' : ''}>
                <Bell size={20} />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/messages" className={({ isActive }) => isActive ? 'active' : ''}>
                <MessageSquare size={20} />
              </NavLink>
            </li>
            <li className="nav-item">
              {user &&
                  <NavLink to={`/user/${user?.username}`} className={({ isActive }) => isActive ? 'active' : ''}>
                       <UserCircle size={20} />
                  </NavLink>}
            </li>
          </ul>
        </nav>
        <div className='right-header'>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className='logout-icn'>
            {user && <LogOut size={20} />}
          </div>
          <div className='flex-btn'>
            {user ? (
                <Button className='logout-btn' variant="danger" onClick={handleLogout}>Logout</Button>
            ) : (
                <>
                  <Button variant="primary-light" onClick={handleLogin}>Login</Button>
                  <Button variant="primary" onClick={handleRegister}>Register</Button>
                </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;