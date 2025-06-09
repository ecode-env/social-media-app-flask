import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadToCloudinary, validateFile } from '../../utils/cloudinary';
import './FileUpload.css';

const FileUpload = ({ onUpload, onRemove, currentImage, disabled = false }) => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelect = async (file) => {
        setError('');

        try {
            validateFile(file);
            setUploading(true);

            const imageUrl = await uploadToCloudinary(file);
            onUpload(imageUrl);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleClick = () => {
        if (!disabled && !uploading) {
            fileInputRef.current?.click();
        }
    };

    const handleRemove = () => {
        setError('');
        onRemove();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="file-upload-container">
            {currentImage ? (
                <div className="uploaded-image-container">
                    <img src={currentImage} alt="Uploaded" className="uploaded-image" />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="remove-image-button"
                        disabled={disabled || uploading}
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div
                    className={`file-upload-area ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''} ${disabled ? 'disabled' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input"
                        disabled={disabled || uploading}
                    />

                    <div className="upload-content">
                        {uploading ? (
                            <>
                                <div className="upload-spinner"></div>
                                <p>Uploading image...</p>
                            </>
                        ) : (
                            <>
                                <div className="upload-icon">
                                    <Upload size={32} />
                                </div>
                                <p className="upload-text">
                                    <span className="upload-primary">Click to upload</span> or drag and drop
                                </p>
                                <p className="upload-subtitle">PNG, JPG, GIF up to 10MB</p>
                            </>
                        )}
                    </div>
                </div>
            )}

            {error && (
                <div className="upload-error">
                    {error}
                </div>
            )}
        </div>
    );
};

export default FileUpload;