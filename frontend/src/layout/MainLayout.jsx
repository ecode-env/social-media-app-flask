import React from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Header from '../components/common/Header.jsx';
import Button from "../components/common/Button.jsx";
import { useAuth } from '../context/AuthContext.jsx';
import './MainLayout.css';

const MainLayout = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleRegister = () => navigate('/register');
    const handleLogin = () => navigate('/login');

    return (
        <div className="layout">
            <Header />
            <div className="layout-container">
                <aside className="sidebar left-sidebar">
                    <div className="sidebar-content">
                        <h3>Navigation</h3>
                        <div className="sidebar-nav">
                            {user ? (
                                <div className="user-sidebar-box">
                                    <img
                                        src={user.profile_picture_url || 'https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg'}
                                        alt="User"
                                        className="user-avatar"
                                    />
                                    <div className="user-space"></div>
                                    <p className="username">@{user.username}</p>
                                    <div className="user-follow">
                                        <a>
                                            <strong>{user.following || 0}</strong> Following
                                        </a>
                                        <a>
                                            <strong>{user.followers || 0}</strong> Followers
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className='sidebar-btn'>
                                        <Button variant="primary-light" onClick={handleLogin}>Login</Button>
                                        <Button variant="primary" onClick={handleRegister}>Register</Button>
                                    </div>
                                    <div className='sidebar-text'>
                                        <h6>Please login</h6>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </aside>
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
