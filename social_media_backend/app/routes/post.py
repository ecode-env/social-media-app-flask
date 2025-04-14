from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError

from ..models.like import Like
from ..models.post import Post
from ..models.user import User
from ..extensions import db



posts_bp = Blueprint('posts', __name__)


@posts_bp.route('/', methods=['GET'])
def get_posts():
    # Get latest posts; you might add pagination in a real application
    posts = Post.query.order_by(Post.created_at.desc()).all()
    # Convert posts to JSON including media_url information
    return jsonify([p.to_json() for p in posts] if posts else {'msg':'No Post Yet'}), 200


@posts_bp.route('/create-post', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Missing JSON data"}), 400

    user_id = data.get('user_id')
    content = data.get('content')
    media_type = data.get('media_type')
    media_url = data.get('media_url')

    if not all([user_id, content, media_type, media_url]):
        return jsonify({"message": "Missing required fields"}), 400

    # Optionally, check that the user exists.
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    new_post = Post(
        user_id=user_id,
        content=content,
        media_type=media_type,
        media_url=media_url,
        created_at=datetime.now(timezone.utc)
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify(new_post.to_json()), 201
