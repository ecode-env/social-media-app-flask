from flask import Flask
from .config import Config
from .extensions import db, jwt, migrate, mail, cors

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)


    return app