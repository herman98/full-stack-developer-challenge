from marshmallow import fields, post_dump
from marshmallow import validate, validates, ValidationError

from app.common import FlaMarshmallow
from app.api.variants.schemas import VariantSerializer

# from .models import Image

"""
    id = Column(Integer, primary_key=True)
    name = Column(String(128), nullable=False)
    description = Column('Descriptions', Text)
    logo_id = Column(Integer, ForeignKey('images.id'),
        nullable=True)
"""

class ProductsParamsSchema(FlaMarshmallow):
    """
    {'page': '1', 'per_page': '10', 'search_list': "['name', 'description']", 'keyword': 'seiko'}

    """
    page = fields.Integer()
    per_page = fields.Integer()
    search_list = fields.String()
    keyword = fields.String()
    delete_status = fields.Boolean()


class ProductSerializer(FlaMarshmallow):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    description = fields.String()
    logo_id = fields.Integer()

    variants = fields.Nested(VariantSerializer, many=True)

    @validates('name')
    def validate_name(self, value):
        if value == "":
            raise ValidationError('Nonempty string')
    
    @validates('logo_id')
    def validate_logo_id(self, value):
        if value == "0":
            self.logo_id = None
            # raise ValidationError('Nonempty string')

