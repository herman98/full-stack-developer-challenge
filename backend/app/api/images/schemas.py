from marshmallow import fields, post_dump
from marshmallow import validate, validates, ValidationError

from app.common import FlaMarshmallow

# from app.api.products.schemas import ProductSerializer

# from .models import Image

"""
    id = Column(Integer, primary_key=True)
    url = Column(String(128), nullable=False)
"""

class SearchParamsSchema(FlaMarshmallow):
    """
    {'page': '1', 'per_page': '10', 'search_list': "['url']", 'keyword': 'seiko'}

    """
    page = fields.Integer()
    per_page = fields.Integer()
    search_list = fields.String()
    keyword = fields.String()
    delete_status = fields.Boolean()


class ImageSerializer(FlaMarshmallow):
    id = fields.Integer(dump_only=True)
    url = fields.String(required=True)

    @validates('url')
    def validate_url(self, value):
        if value == "":
            raise ValidationError('url can not be empty')
