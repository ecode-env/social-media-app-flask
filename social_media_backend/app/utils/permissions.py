from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from ..models.user import User, UserRoleEnum


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Retrieve the identity from the JWT
        user_id = get_jwt_identity()
        if not user_id:
            return jsonify({"error": "Missing user identity"}), 401

        # Query for the user
        user = User.query.get(user_id)
        if not user or user.role != UserRoleEnum.admin:
            return jsonify({"error": "Admin privileges required"}), 403

        return fn(*args, **kwargs)

    return wrapper
