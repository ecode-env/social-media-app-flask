from flask import jsonify
from flask_jwt_extended.exceptions import NoAuthorizationError
from werkzeug.exceptions import Unauthorized

def register_auth_error_handlers(app):
    @app.errorhandler(NoAuthorizationError)
    def handle_no_auth_error(e):
        return jsonify({"error": "Login required"}), 401

    @app.errorhandler(Unauthorized)
    def handle_unauthorized_error(e):
        return jsonify({"error": "Unauthorized access; please log in"}), 401

    # You can also add more here:
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Not Found"}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Internal Server Error"}), 500
