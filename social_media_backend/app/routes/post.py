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

    # Get user_id from JWT
    user_id = get_jwt_identity()

    # Optional fields based on model
    content = data.get('content')
    media_type = data.get('media_type')
    media_url = data.get('media_url')
    title = data.get('title')
    post_type = data.get('post_type')

    # Validate user exists
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Ensure at least content or title is provided (for article-only posts)
    if not content and not title:
        return jsonify({"message": "At least title or content is required"}), 400

    # Validate media_type if provided
    if media_type:
        if media_type not in ['image', 'video']:
            return jsonify({"message": "Invalid media_type. Must be 'image' or 'video'"}), 400
        # Ensure media_url is provided if media_type is set
        if not media_url:
            return jsonify({"message": "media_url is required when media_type is provided"}), 400
    # If media_url is provided without media_type, reject
    elif media_url:
        return jsonify({"message": "media_type is required when media_url is provided"}), 400

    # Infer post_type if not provided
    if not post_type:
        if content and not media_url:
            post_type = 'text'
        elif media_url and not content:
            post_type = media_type
        elif content and media_url:
            post_type = 'mixed'
        else:
            post_type = 'text'

    try:
        new_post = Post(
            user_id=user_id,
            content=content,
            media_type=media_type,
            media_url=media_url,
            title=title,
            post_type=post_type,
            created_at=datetime.now(timezone.utc)
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify(new_post.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Failed to create post: {str(e)}"}), 500


@posts_bp.route("/<int:post_id>/like", methods=["POST"])
@jwt_required()
def like_post(post_id):
    user_id = get_jwt_identity()

    # Check if the user already liked this post
    already_liked = Like.query.filter_by(user_id=user_id, post_id=post_id).first()


    if already_liked:
        # Unlike the post
        db.session.delete(already_liked)
        try:
            db.session.commit()
            like_count = Like.query.filter_by(post_id=post_id).count()
            return jsonify({"message": False, "like_count": like_count}), 200
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": "Failed to unlike post"}), 500
    else:
        # Like the post
        new_like = Like(user_id=user_id, post_id=post_id)
        db.session.add(new_like)
        try:
            db.session.commit()
            like_count = Like.query.filter_by(post_id=post_id).count()
            return jsonify({"message": True, "like_count": like_count}), 201
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": "Failed to like post"}), 500

