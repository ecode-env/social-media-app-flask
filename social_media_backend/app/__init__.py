from flask import Flask
from .config import Config
from .extensions import db, jwt, migrate, mail, cors
from os import path,environ
from .routes.auth import auth_bp
from .routes.auth import auth_bp
from .models.user import User
from .models.post import Post
from .models.comment import Comment
from .models.CommentLike import CommentLike
from .models.like import Like
from .models.follow import Follow

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
