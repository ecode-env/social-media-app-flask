export const uploadToCloudinary = async (file) => {
  const formData = new FormData();

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;


  if (!cloudName || !uploadPreset) {
    throw new Error(
        'Cloudinary configuration missing. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your environment variables.'
    );
  }

  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);


  try {
    const response = await api.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};

// Validate file type and size
export const validateFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 10 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
  }

  if (file.size > maxSize) {
    throw new Error('File size must be less than 10MB');
  }

  return true;
};
