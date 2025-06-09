import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { Pencil } from 'lucide-react';
import PostList from '../components/posts/PostList';
import { useAuth } from '../context/AuthContext.jsx';
import './ProfilePage.css';
import { useProfile } from "../hooks/useProfile.jsx";
import Avatar from '../assets/images/Avatar.png';


const ProfilePage = () => {
  const { username } = useParams();
  const { profile, loading, error } = useProfile(username)
  const { user } = useAuth();

  if (loading || !username) {
    return <div className="loading">Loading post...</div>;
  }

  if (error) {
    console.error(error.message);
    return <div className="error">Error: {error.message}</div>;
  }

  return (
      <div className="profile-page">
        <div className="profile-header">
          {
            user?.username === username &&
              <Link to="/profile/edit" className="edit-profile-button">
                <Pencil size={16} />
                <span>Edit Profile</span>
              </Link>
          }


          <img src={profile.user.profile_picture_url || Avatar} alt={`${profile?.user?.f_name} ${profile?.user?.l_name}`} className="profile-avatar" />
          <div className="profile-info">
            <h1>{`${profile?.user?.f_name} ${profile?.user?.l_name}`}</h1>
            <p className="username">@{profile.user.username}</p>
            <p className="bio">{profile.user.bio}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">{profile.user.followers_count}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat">
                <span className="stat-value">{profile.user.following_count}</span>
                <span className="stat-label">Following</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-posts">
          <h2>Posts</h2>
          <PostList filterByUser={true} userId={profile.user.id} />
        </div>
      </div>
  );
};

export default ProfilePage;