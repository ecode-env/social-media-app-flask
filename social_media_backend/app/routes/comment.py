from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, current_user
from ..models.comment import Comment
from ..models.CommentLike import CommentLike
from ..extensions import db

comments_bp = Blueprint('comments', __name__)


# Create a comment on a post
@comments_bp.route('/<int:post_id>/comments', methods=['POST'])
@jwt_required()
def create_comment(post_id):
    data = request.get_json()
    content = data.get('content')

    if not content:
        return jsonify({'error': 'Comment content is required'}), 400

    comment = Comment(content=content, user_id=current_user.id, post_id=post_id)
    db.session.add(comment)
    db.session.commit()

    return jsonify(comment.serialize(current_user.id)), 201
