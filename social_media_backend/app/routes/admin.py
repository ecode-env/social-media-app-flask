from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from ..utils.decorators import admin_required

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
@admin_required
def admin_dashboard():
    # Insert your admin-specific logic here.
    return jsonify({"message": "Welcome to the admin dashboard!"}), 200
