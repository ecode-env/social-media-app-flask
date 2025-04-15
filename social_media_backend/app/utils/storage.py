import os
from flask import current_app

class Storage:
    def __init__(self, backend):
        self.backend = backend

    def upload(self, file, filename):
        if self.backend == 'local':
            return self._upload_local(file, filename)
        elif self.backend == 'cloudinary':
            return self._upload_cloudinary(file, filename)
        else:
            raise ValueError("Unknown storage backend")

    def _upload_local(self, file, filename):
        upload_folder = current_app.config.get('UPLOAD_FOLDER', 'static/uploads')
        file_path = os.path.join(upload_folder, filename)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        file.save(file_path)
        return f"static/uploads/{filename}"

    def _upload_cloudinary(self, file, filename):
        # Placeholder for Cloudinary upload logic
        # Implement this when switching to Cloudinary
        pass