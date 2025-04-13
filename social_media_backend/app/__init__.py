from flask import Flask
from .config import Config
from .extensions import db, jwt, migrate, mail, cors

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    cors.init_app(app)

    with app.app_context():
        db.create_all()

    return app
