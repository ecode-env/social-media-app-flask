from flask_jwt_extended.exceptions import (
    NoAuthorizationError, InvalidHeaderError, JWTDecodeError
)
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from werkzeug.exceptions import Unauthorized
from flask import jsonify

def register_auth_error_handlers(app):

    @app.errorhandler(NoAuthorizationError)
    def handle_no_auth_error(e):
        return jsonify({"error": "Token missing. Please log in."}), 401

    @app.errorhandler(ExpiredSignatureError)
    def handle_expired_token(e):
        return jsonify({"error": "Token expired. Please log in again."}), 401

    @app.errorhandler(InvalidTokenError)
    def handle_invalid_token(e):
        return jsonify({"error": "Invalid token. Token might be tampered."}), 401

    @app.errorhandler(InvalidHeaderError)
    def handle_invalid_header(e):
        return jsonify({"error": "Invalid Authorization header."}), 400

    @app.errorhandler(JWTDecodeError)
    def handle_decode_error(e):
        return jsonify({"error": "Token decode failed."}), 400

    @app.errorhandler(Unauthorized)
    def handle_unauthorized_error(e):
        return jsonify({"error": "Unauthorized access; please log in."}), 401
