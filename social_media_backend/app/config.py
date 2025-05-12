from dotenv import load_dotenv
from os import environ

load_dotenv()

class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI", f"sqlite:///social_media.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Flask secret key for securely signing cookies
    SECRET_KEY = environ.get("SECRET_KEY", "fallback-secret-key")

    # JWT secret key for token signing
    JWT_SECRET_KEY = environ.get("JWT_SECRET_KEY", "fallback-jwt-secret-key")

    # Uploads
    UPLOAD_FOLDER = environ.get("UPLOAD_FOLDER", "social_media_backend/static/uploads")

    STORAGE_BACKEND = environ.get('STORAGE_BACKEND', 'local')



import os
import subprocess
from datetime import datetime

# Set your name and email if needed
# subprocess.run(['git', 'config', 'user.name', 'your_username'])
# subprocess.run(['git', 'config', 'user.email', 'your_email@example.com'])

# Create a file to track the commits
file_name = "commit_spam.txt"

# Get today's date in the right format
today = datetime.now().strftime("%Y-%m-%d")

for i in range(1, 71):  # 1 to 70
    with open(file_name, "a") as file:
        file.write(f"Commit number {i} on {today}\n")

    subprocess.run(["git", "add", file_name])
    subprocess.run(["git", "commit", "--date", f"{today}T12:00:00", "-m", f"Commit {i} - feeling under the weather 🌧️"])

print("✅ Done making 70 commits!")

# After script finishes, don't forget to push
print("\nNow run: git push origin main (or master)")
