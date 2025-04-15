import os

def allowed_file(filename):
    return ('.' in filename
            and filename.rsplit('.', 1)[1].lower()
            in {'jpg', 'jpeg', 'png', 'gif', 'mp4', 'avi', 'mov'})

def get_media_type(filename):
    ext = os.path.splitext(filename)[1].lower()
    if ext in ['.jpg', '.jpeg', '.png', '.gif']:
        return 'image'
    elif ext in ['.mp4', '.avi', '.mov']:
        return 'video'
    return None