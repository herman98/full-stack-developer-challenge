from os.path import join as path_join, dirname

from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow

from .hooks import apply_hooks

_directory = dirname(__file__)
app = Flask(__name__,
            static_folder=path_join(_directory, '_static'),
            template_folder='templates',)


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root_password@172.20.0.3:3306/sourcesage_db'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root_password@db:3306/sourcesage_db'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

ma = Marshmallow(app)

from .api import app_bp
app.register_blueprint(app_bp, url_prefix='/api')
apply_hooks(app)

from app import views, models