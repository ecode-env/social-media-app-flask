import os

def allowed_file(filename):
    return ('.' in filename
            and filename.rsplit('.', 1)[1].lower()
            in {'jpg', 'jpeg', 'png', 'gif', 'mp4', 'avi', 'mov'})
