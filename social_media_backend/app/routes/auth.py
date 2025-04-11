from flask import Blueprint,jsonify
from ..extensions import db
from ..models.user import User

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    new_user = User(
        name='eyob',
        email='eyob@gmail.com'
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created'}), 201
