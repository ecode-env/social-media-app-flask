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
  const { isAuthenticated } = useAuth();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasRedirected.current) {
      hasRedirected.current = true;
      notifyError('Please log in!');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createPost(formData);
      notifySuccess('Created new post');
      navigate('/');
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

  const handleImageUpload = (imageUrl) => {

    setFormData(prev => ({ ...prev, media_url: imageUrl }));
  };

  const handleImageRemove = () => {
    setFormData(prev => ({ ...prev, media_url: '' }));
  };

  return (
      <div className="create-post-page">
        <h1>Create Post</h1>

        <form className="create-post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">
              <Type size={20} className="icon" />
              Title
            </label>
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
            <label htmlFor="content">
              <FileText size={20} className="icon" />
              Content
            </label>
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
            <label>
              Add Image
            </label>
            <FileUpload
                onUpload={handleImageUpload}
                onRemove={handleImageRemove}
                currentImage={formData.media_url}
                disabled={isLoading}
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