from datetime import datetime, timezone
from email_validator import validate_email, EmailNotValidError
from ..utils.auth import hash_password,generate_token, verify_password
from validators import url as validate_url
from flask import Blueprint,jsonify,request
from ..models.user import User, UserRoleEnum
from ..extensions import db
import re



auth_bp = Blueprint('auth', __name__)


# Password Validation
def is_valid_password(password) -> bool:
    if len(password) < 8:
        return False
    if not re.search(r"[A-Z]", password):
        return False
    if not re.search(r"[a-z]", password):
        return False
    if not re.search(r"[0-9]", password):
        return False
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False
    return True




@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Extract input
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    f_name = data.get('f_name')
    l_name = data.get('l_name')
    bio = data.get('bio')
    profile_picture_url = data.get('profile_picture_url')

    # Basic validation
    if not all([username, email, password, f_name, l_name]):
        return jsonify({"message": "Missing required fields"}), 400

    # Check if username or email already exists
    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({"message": "Username or email already exists"}), 409

    # Email validation
    try:
        validate_email(email, check_deliverability=False)
    except EmailNotValidError as e:
        return jsonify({"message": f"Invalid email address: {str(e)}"}), 400


        # Password validation
    if not is_valid_password(password):
        return jsonify({
            'error': 'Password must be at least 8 characters long, with uppercase, '
                     'lowercase, number, and special character'
        }), 400

    # Validate the profile picture URL if provided
    if profile_picture_url:
        if not validate_url(profile_picture_url):
            return jsonify({"message": "Invalid Profile Picture URL"}), 400

    # Hash the password
    hashed_password=hash_password(password)