from datetime import datetime, timezone
from email_validator import validate_email, EmailNotValidError
from ..utils.auth import hash_password,generate_token, verify_password
from validators import url as validate_url
from flask import Blueprint,jsonify,request
from ..models.user import User, UserRoleEnum
from ..extensions import db
import re



auth_bp = Blueprint('auth', __name__)
