import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Type, FileText } from 'lucide-react';
import Button from '../components/common/Button';
import FileUpload from '../components/common/FileUpload';
import './CreatePostPage.css';
import { createPost } from '../services/postService';
import { useAuth } from '../context/AuthContext.jsx';
import {notifySuccess,  notifyError } from '../utils/toast.js';


const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    media_url: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createPost(formData);
      navigate('/profile');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="create-post-page">
      <h1>Create Post</h1>
      
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="What's on your mind?"
            rows={5}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="media_url">
            <Image size={20} className="icon" />
            Add Image URL
          </label>
          <input
            type="url"
            id="media_url"
            name="media_url"
            value={formData.media_url}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>
        
        <div className="form-actions">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;