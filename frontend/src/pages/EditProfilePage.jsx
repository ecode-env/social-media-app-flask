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
            setSubmitting(true);
            const res = await editProfile(user?.username,formData);
            notifySuccess(res.message || 'Profile updated!');
            navigate(`/user/${formData.username}`);
        } catch (error) {
            console.error('Error updating profile:', error);
            notifyError(error.response?.data?.message || "Failed to update profile.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarUpload = (imageUrl) => {
        setFormData(prev => ({ ...prev, profile_picture_url: imageUrl }));
    };

    const handleAvatarRemove = () => {
        setFormData(prev => ({ ...prev, profile_picture_url: '' }));
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
                        currentImage={formData.profile_picture_url}
                    />
                </div>

                <div className="form-section">
                    <div className="form-group">
                        <div className='form-group-name'>
                            <label htmlFor="f_name">First Name</label>
                            <input
                                type="text"
                                id="f_name"
                                name="f_name"
                                value={formData.f_name}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                        <div className='form-group-name'>
                            <label htmlFor="l_name">Last Name</label>
                            <input
                                type="text"
                                id="l_name"
                                name="l_name"
                                value={formData.l_name}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            disabled
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
                    <Button type="submit" variant="primary" disabled={submitting}>
                        {submitting ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;