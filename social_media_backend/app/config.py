from dotenv import load_dotenv
from os import environ

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI", "sqlite:///social_media.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = environ.get("SECRET_KEY", "fallback-secret-key")
    JWT_SECRET_KEY = environ.get("JWT_SECRET_KEY", "fallback-jwt-secret")