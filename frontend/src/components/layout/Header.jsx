import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ThemeContext } from '../../context/ThemeContext';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import '../../styles/header.css';


export default function Header() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="header">
            <Link to='/' >
                <h1> <img className='logo' src='../../../public/images/logo.png'  alt='logo '/> </h1>
            </Link>
            {/* Mobile Menu Toggle */}
            <button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
            >
                {isMobileMenuOpen ? '✕' : '☰'}
            </button>
            {/* Navigation Links */}
            <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <Link to="/"><HomeOutlinedIcon fontSize="large" /></Link>
                <Link to="/chat"><ChatBubbleOutlineOutlinedIcon fontSize="large" /></Link>
                <Link to="/groups"><GroupOutlinedIcon fontSize="large" /></Link>
                {user ? (
                    <>
                        <span className="welcome">Welcome, {user.username}</span>
                        <button onClick={logout} className="btn logout">
                            <PersonRemoveOutlinedIcon fontSize="large" />
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="login">
                        <PersonAddOutlinedIcon fontSize="large" />
                    </Link>
                )}
                <Link to="/notification">
                    <NotificationsOutlinedIcon fontSize="large" />
                </Link>
                <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
      />
      <Link to="/search" className="search-icon">
        <SearchOutlinedIcon fontSize="medium" />
      </Link>
    </div>
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