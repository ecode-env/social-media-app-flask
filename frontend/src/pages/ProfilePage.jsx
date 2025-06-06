import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import PostList from '../components/posts/PostList';
import './ProfilePage.css';

const ProfilePage = () => {
  const profile = {
    username: 'johndoe',
    fullName: 'John Doe',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    bio: 'Software developer passionate about web technologies',
    followers: 1234,
    following: 567
  };

  return (
      <div className="profile-page">
        <div className="profile-header">
          <Link to="/profile/edit" className="edit-profile-button">
            <Pencil size={16} />
            <span>Edit Profile</span>
          </Link>

          <img src={profile.avatar} alt={profile.fullName} className="profile-avatar" />
          <div className="profile-info">
            <h1>{profile.fullName}</h1>
            <p className="username">@{profile.username}</p>
            <p className="bio">{profile.bio}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">{profile.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat">
                <span className="stat-value">{profile.following}</span>
                <span className="stat-label">Following</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-posts">
          <h2>Posts</h2>
          <PostList />
        </div>
      </div>
  );
};

export default ProfilePage;