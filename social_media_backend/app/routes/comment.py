from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.comment import Comment
from ..models.CommentLike import CommentLike
from ..extensions import db

comments_bp = Blueprint('comments', __name__)


# Create a comment on a post
@comments_bp.route('/<int:post_id>/create-comment', methods=['POST'])
@jwt_required()
def create_comment(post_id):
    data = request.get_json()
    content = data.get('content')
    current_id=get_jwt_identity()

    if not content:
        return jsonify({'error': 'Comment content is required'}), 400

    comment = Comment(content=content, user_id=current_id, post_id=post_id)
    db.session.add(comment)
    db.session.commit()

    return jsonify(comment.serialize(current_id)), 201


# Get all comments of a post with pagination
@comments_bp.route('/<int:post_id>/comments', methods=['GET'])
@jwt_required(optional=True)
def get_comments(post_id):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('limit', 10, type=int)

    pagination = Comment.query.filter_by(post_id=post_id)\
        .order_by(Comment.created_at.desc())\
        .paginate(page=page, per_page=per_page, error_out=False)

    comments = [comment.serialize(current_user.id if current_user else None) for comment in pagination.items]

    return jsonify({
        'comments': comments,
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': pagination.page
    }), 200


# Like or Unlike a comment
@comments_bp.route('/comments/<int:comment_id>/like', methods=['POST'])
@jwt_required()
def like_comment(comment_id):
    existing_like = CommentLike.query.filter_by(comment_id=comment_id, user_id=current_user.id).first()

    if existing_like:
        db.session.delete(existing_like)
        is_liked = False
    else:
        new_like = CommentLike(user_id=current_user.id, comment_id=comment_id)
        db.session.add(new_like)
        is_liked = True

    db.session.commit()

    return jsonify({
        'message': 'Comment liked' if is_liked else 'Comment unliked',
        'is_liked': is_liked
    }), 200

