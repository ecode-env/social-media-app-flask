import os
import uuid
import logging
from datetime import datetime, timezone
from flask import Blueprint, jsonify, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..utils.helpers import allowed_file,get_media_type
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.utils import secure_filename
from ..models.like import Like
from ..models.post import Post
from ..models.user import User
from ..extensions import db

# Configure logging to print ERROR-level messages (or higher) to the console.
logging.basicConfig(level=logging.ERROR)

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/', methods=['GET'])
def get_posts():
    # Retrieve the latest posts; consider adding pagination for more scalability.
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify([p.to_json() for p in posts] if posts else {'msg': 'No Post Yet'}), 200


@posts_bp.route('/create-post', methods=['POST'])
@jwt_required()
def create_post():
    # Get the ID of the current user from the JWT.
    user_id = get_jwt_identity()
    data = request.get_json()

    # Validate that the user exists.
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Get form data.
    content = request.form.get('content')
    title = request.form.get('title')
    media_file = request.files.get('media')

    media_url = None
    media_type = None

    # Handle media file upload if provided.
    if media_file:
        if allowed_file(media_file.filename):
            original_filename = secure_filename(media_file.filename)
            unique_filename = f"{uuid.uuid4().hex}_{original_filename}"
            upload_folder = current_app.config.get('UPLOAD_FOLDER', 'static/uploads')
            file_path = os.path.join(upload_folder, unique_filename)
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            media_file.save(file_path)
            media_url = f"static/uploads/{unique_filename}"
            media_type = get_media_type(unique_filename)
            if not media_type:
                return jsonify({"message": "Unsupported media file type"}), 400
        else:
            return jsonify({"message": "Invalid file type"}), 400

    # Validate the provided data and determine the type of post.
    if content and not title:
        return jsonify({"message": "Title is required for article posts"}), 400

    if title and not content and not media_url:
        post_type = 'text'  # Title only.
    elif title and content and media_url:
        post_type = 'mixed'  # Title, content, and media.
    elif title and not content and media_url:
        post_type = 'mixed'  # Title and media.
    elif not title and not content and media_url:
        post_type = 'media'  # Media only.
    else:
        post_type = 'text'  # Title with or without content and no media.

    # Create the post record in the database.
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

    # Catch database-related errors.
    except SQLAlchemyError as db_err:
        logging.error(f"Database error when creating post for user {user_id}: {db_err}")
        db.session.rollback()
        return jsonify({"message": "Database error occurred"}), 500

    # Catch any other unexpected errors.
    except Exception as e:
        logging.error(f"Unexpected error when creating post for user {user_id}: {e}")
        db.session.rollback()
        return jsonify({"message": "Failed to create post"}), 500


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

# Delete post

@posts_bp.route('/<int:post_id>/delete-post', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    print(current_user.username)

    post = Post.query.get_or_404(post_id)

    # Check if the current user is admin or the owner of the post
    if current_user.role != 'admin' and post.author.id != current_user.id:
        return jsonify({"error": "You are not authorized to delete this post"}), 403

    db.session.delete(post)
    db.session.commit()
    return jsonify({"msg": "Post deleted successfully"}), 200

