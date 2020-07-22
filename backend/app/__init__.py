from os.path import join as path_join, dirname
from datetime import timedelta


from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin

from .hooks import apply_hooks

_directory = dirname(__file__)
app = Flask(__name__,
            static_folder=path_join(_directory, '_static'),
            template_folder='templates',)


app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_SUPPORTS_CREDENTIALS'] = True
app.config['DEBUG'] = True #IS_DEBUG_ENVIRONMENT
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root_password@172.18.0.4:3306/sourcesage_db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root_password@db:3306/sourcesage_db'

app.config['SECRET_KEY'] = 'TEST'

CORS(app, supports_credentials=True)
apply_hooks(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
ma = Marshmallow(app)

from .api import app_bp
app.register_blueprint(app_bp, url_prefix='/api')


from app import views, models
