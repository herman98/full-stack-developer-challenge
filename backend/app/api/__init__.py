from flask import Blueprint
from flask_restful import Api
from flask_cors import CORS

from ..hooks import add_cors_headers, apply_hooks

app_bp = Blueprint('api', __name__)
api = Api(app_bp)

CORS(app_bp) # enable CORS on the API_v1 blue print
apply_hooks(app_bp)
# app_bp.after_request(add_cors_headers)


from .products.urls import *
from .variants.urls import *
from .images.urls import *
