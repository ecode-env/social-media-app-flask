from flask import Blueprint, jsonify
from ..models.like import Like
from ..models.post import Post
from ..models.user import User
from ..models.follow import Follow
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy import desc

users_bp = Blueprint('users',__name__)