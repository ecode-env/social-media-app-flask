from dotenv import load_dotenv
from os import environ

load_dotenv()

class Config:
    SECRET_KEY = environ.get("SECRET_KEY","eyob-mulugeta")
    DATABASE_URL = environ.get("DATABASE_URL","sqlite:///social_media.db")
    JWT_SECRET_KEY = environ.get("JWT_SECRET_KEY","your-jwt-secret")