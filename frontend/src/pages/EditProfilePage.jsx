import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import FileUpload from '../components/common/FileUpload';
import './EditProfilePage.css';
import { useProfile } from "../hooks/useProfile.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { notifySuccess, notifyError } from "../utils/toast.js";
import { editProfile } from "../services/profileService.js";

const getInitialFormData = (profile) => ({
    f_name: profile?.user?.f_name || '',
    l_name: profile?.user?.l_name || '',
    username: profile?.user?.username || '',
    bio: profile?.user?.bio || '',
    email: profile?.user?.email || '',
    profile_picture_url: profile?.user?.profile_picture_url || ''
});

const EditProfilePage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { profile, loading, error } = useProfile(user?.username);

    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        username: '',
        bio: '',
        email: '',
        profile_picture_url: ''
    });

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (profile) {
            setFormData(getInitialFormData(profile));
        }
    }, [profile]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple client-side validation
        if (!formData.f_name.trim() || !formData.l_name.trim() || !formData.email.trim()) {
            notifyError("First name, last name, and email are required.");
            return;
        }

        try {
            // Here you would typically make an API call to update the profile
            console.log('Profile updated:', formData);
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarUpload = (imageUrl) => {
        setFormData(prev => ({ ...prev, avatar: imageUrl }));
    };

    const handleAvatarRemove = () => {
        setFormData(prev => ({ ...prev, avatar: '' }));
    };

    return (
        <div className="edit-profile-page">
            <h1>Edit Profile</h1>

            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div className="profile-picture-section">
                    <label>Profile Picture</label>
                    <FileUpload
                        onUpload={handleAvatarUpload}
                        onRemove={handleAvatarRemove}
                        currentImage={formData.avatar}
                    />
                </div>

                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                            rows={4}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <Button type="button" variant="ghost" onClick={() => navigate('/profile')}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;