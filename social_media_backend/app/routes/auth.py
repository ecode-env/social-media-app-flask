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
