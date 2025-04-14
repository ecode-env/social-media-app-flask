from flask import Flask
from .config import Config
from .extensions import db, jwt, migrate, mail, cors
from .routes.auth import auth_bp
from .routes.user import users_bp
from .routes.message import messages_db
from .routes.post import posts_bp
from .routes.comment import comments_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)


    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    cors.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')





    #create database
    with app.app_context():
        db.create_all()


    return app
