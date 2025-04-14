from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from datetime import timedelta

def hash_password(password: str) -> str:
    return generate_password_hash(password)

def verify_password(password: str, hashed: str) -> bool:

    return check_password_hash(hashed, password)

def generate_token(user_id: int) -> str:

    expires = timedelta(hours=24)
    return create_access_token(identity=user_id, expires_delta=expires)
