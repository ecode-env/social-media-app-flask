from flask import Blueprint, jsonify
from ..models.like import Like
from ..models.post import Post
from ..models.user import User
from ..models.follow import Follow
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy import desc

users_bp = Blueprint('users',__name__)


@users_bp.route('/<username>', methods=['GET'])
@jwt_required(optional=True)
def get_user_profile(username):
    user = User.query.filter_by(username=username).first_or_404()
    current_user_id = get_jwt_identity()

    # Following status
    is_following = False
    if current_user_id:
        is_following = Follow.query.filter_by(
            follower_id=current_user_id,
            following_id=user.id
        ).first() is not None

    # Liked post IDs (only for profile user's posts)
    liked_post_ids = []
    if current_user_id:
        liked_post_ids = [
            like.post_id for like in Like.query.filter_by(user_id=current_user_id)
            .join(Post).filter(Post.user_id == user.id).all()
        ]

    # Recent posts
    recent_posts = [
        post.to_json() for post in Post.query
        .filter_by(user_id=user.id)
        .order_by(desc(Post.created_at))
        .limit(5)
        .all()
    ]

    # Followers and following
    followers = [
        f.follower.to_json() for f in Follow.query
        .filter_by(following_id=user.id)
        .limit(5)
        .all()
    ]
    following = [
        f.following.to_json() for f in Follow.query
        .filter_by(follower_id=user.id)
        .limit(5)
        .all()
    ]

    return jsonify({
        "user": user.to_json(),
        "is_following": is_following,
        "recent_posts": recent_posts,
        "followers": followers,
        "following": following,
        "liked_post_ids": liked_post_ids,
    })