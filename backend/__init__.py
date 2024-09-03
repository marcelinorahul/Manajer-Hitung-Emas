from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Load configurations
    app.config.from_object('config.Config')

    # Initialize database
    db.init_app(app)

    with app.app_context():
        # Import routes and models
        from . import routes, models

        # Create tables
        db.create_all()

        return app
