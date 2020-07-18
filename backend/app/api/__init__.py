from flask import Blueprint
from flask_restful import Api

app_bp = Blueprint('api', __name__)
api = Api(app_bp)

from .products.urls import *
from .variants.urls import *
from .images.urls import *
