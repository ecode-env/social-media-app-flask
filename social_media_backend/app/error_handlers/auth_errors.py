from flask import redirect, jsonify
from flask_jwt_extended.exceptions import NoAuthorizationError
from werkzeug.exceptions import Unauthorized

def register_auth_error_handlers(app):
    # This error handler catches cases where a token is missing.
    @app.errorhandler(NoAuthorizationError)
    def handle_no_auth_error(e):
        # For a user interface
        # return redirect('/register')
        # For an API
        return jsonify({"error": "Login required"}), 401

    # This handles Unauthorized exceptions.
    @app.errorhandler(Unauthorized)
    def handle_unauthorized_error(e):
        # Similarly, redirect to the registration page.
        # return redirect('/register')
        # Or return a JSON error:
        return jsonify({"error": "Unauthorized access; please log in"}), 401
