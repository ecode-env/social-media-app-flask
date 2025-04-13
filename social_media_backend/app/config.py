from dotenv import load_dotenv
from os import environ

load_dotenv()


class Config:
    SECRET_KEY = environ.get("SECRET_KEY","eyob-mulugeta")
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI","sqlite:///social_media.db")
    JWT_SECRET_KEY = environ.get("JWT_SECRET_KEY","your-jwt-secret")
