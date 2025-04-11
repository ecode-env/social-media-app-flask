from flask import Flask
from .config import db



def create_app():
    app = Flask(__name__)

    app.config(db)


    with app.app_context():
        db.create_all()

    return app