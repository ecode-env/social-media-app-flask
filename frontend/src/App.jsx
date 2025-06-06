import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import MessagesPage from './pages/MessagesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import EditProfilePage from './pages/EditProfilePage';
import { useTheme } from './hooks/useTheme.jsx';

const App = () => {
    const { theme } = useTheme();

    return (
        <div className={`app ${theme}`}>
            <Router
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="posts/:id" element={<PostDetailPage />} />
                        <Route path="notifications" element={<NotificationsPage />} />
                        <Route path="messages" element={<MessagesPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="profile/edit" element={<EditProfilePage />} />
                        <Route path="create-post" element={<CreatePostPage />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;