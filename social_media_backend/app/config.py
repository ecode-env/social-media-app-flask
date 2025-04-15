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
