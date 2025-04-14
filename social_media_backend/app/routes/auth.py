from flask import Blueprint
from ..utils import auth


auth_bp = Blueprint('auth', __name__)
