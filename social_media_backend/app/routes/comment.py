from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, current_user
from ..models.comment import Comment
from ..models.CommentLike import CommentLike
from ..extensions import db

comments_bp = Blueprint('comments', __name__)
