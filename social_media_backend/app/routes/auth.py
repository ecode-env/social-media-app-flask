from datetime import datetime, timezone
from email_validator import validate_email, EmailNotValidError
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..utils.auth import hash_password,generate_token, verify_password
from validators import url as validate_url
from flask import Blueprint,jsonify,request
from ..models.user import User, UserRoleEnum
from ..extensions import db
import re



auth_bp = Blueprint('auth', __name__)


# Password Validation
def is_valid_password(password) -> bool:
    if len(password) < 6:
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

@auth_bp.route('/auth/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 200



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

    # Create the user
    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
        f_name=f_name,
        l_name=l_name,
        bio=bio,
        profile_picture_url=profile_picture_url,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
        last_seen=datetime.now(timezone.utc),
        role=UserRoleEnum.user
    )

    db.session.add(new_user)
    db.session.commit()

    # Generate JWT token that expires in 2 days
    access_token = generate_token(str(new_user.id))

    return jsonify({
        "message": "User registered successfully.",
        "access_token": access_token,
        "user": new_user.to_json()
    }), 201



#Login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Missing JSON data"}), 400

    # Extract and normalize input
    email = data.get('email', '').strip().lower()
    password = data.get('password')

    # Basic validation
    if not email or not password:
        return jsonify({"message": "Missing email or password"}), 400

    # Email format validation
    try:
        validate_email(email, check_deliverability=False)
    except EmailNotValidError as e:
        return jsonify({"message": f"Invalid email address: {str(e)}"}), 400

    # Find user
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Email not found"}), 401

    # Verify password
    if not verify_password(password, user.password):
        return jsonify({"message": "Incorrect password"}), 401

    # Update last_seen timestamp
    user.last_seen = datetime.now(timezone.utc)
    db.session.commit()

    # Generate token
    try:
        token = generate_token(str(user.id))
        return jsonify({
            "message": "Login successful",
            "access_token": token,
            "expires_in": 86400,
            "user": user.to_json()
        }), 200
    except Exception as e:
        return jsonify({
            "message": "Failed to generate token",
            "error": str(e)
        }), 500