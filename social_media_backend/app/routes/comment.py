from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.comment import Comment
from ..models.CommentLike import CommentLike
from ..extensions import db
from ..models.post import Post

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
    current_id = get_jwt_identity()

    # Check if post exists
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"message": "Post not found"}), 404

    pagination = Comment.query.filter_by(post_id=post_id) \
        .order_by(Comment.created_at.desc()) \
        .paginate(page=page, per_page=per_page, error_out=False)

    comments = [comment.serialize(current_id) for comment in pagination.items]

    return jsonify({
        'comments': comments,
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': pagination.page
    }), 200


# Like or Unlike a comment
@comments_bp.route('/<int:comment_id>/like', methods=['POST'])
@jwt_required()
def like_comment(comment_id):
    current_id=get_jwt_identity()

    existing_like = CommentLike.query.filter_by(comment_id=comment_id, user_id=current_id).first()

    if existing_like:
        db.session.delete(existing_like)
        is_liked = False
    else:
        new_like = CommentLike(user_id=current_id, comment_id=comment_id)
        db.session.add(new_like)
        is_liked = True

    db.session.commit()

    return jsonify({
        'message': 'Comment liked' if is_liked else 'Comment unliked',
        'is_liked': is_liked
    }), 200

@comments_bp.route('/<int:comment_id>/delete', methods=['DELETE'])
@jwt_required()
def delete_comment(comment_id):
    current_user_id = get_jwt_identity()
    comment = Comment.query.get_or_404(comment_id)


    if comment.user_id != int(current_user_id):
        return jsonify({'error': 'Unauthorized'}), 403

    db.session.delete(comment)
    db.session.commit()

    return jsonify({'message': 'Comment deleted successfully', 'success': True}), 200

# Edit a comment
@comments_bp.route('/<int:comment_id>/edit', methods=['PUT'])
@jwt_required()
def edit_comment(comment_id):
    current_user_id = get_jwt_identity()
    data = request.get_json()
    new_content = data.get('content')

    if not new_content:
        return jsonify({'error': 'Updated comment content is required'}), 400

    comment = Comment.query.get_or_404(comment_id)

    if comment.user_id != int(current_user_id):
        return jsonify({'error': 'Unauthorized'}), 403

    comment.content = new_content
    db.session.commit()

    return jsonify({'message': 'Comment updated successfully', 'comment': comment.serialize(current_user_id)}), 200


