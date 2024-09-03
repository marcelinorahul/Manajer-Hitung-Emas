from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load configurations
app.config.from_object('config.Config')

# Initialize database
db = SQLAlchemy(app)

from routes import *

if __name__ == '__main__':
    app.run(debug=True)
