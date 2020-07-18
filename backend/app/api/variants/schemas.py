from marshmallow import fields, post_dump
from marshmallow import validate, validates, ValidationError

from app.common import FlaMarshmallow

# from app.api.products.schemas import ProductSerializer

# from .models import Image

"""
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'),
        nullable=False)
    product = db.relationship('Product', backref='variants', lazy=True)

    name = Column(String(128), nullable=False)
    size = Column(String(64), nullable=False)
    color = Column(String(64), nullable=False)
"""

class SearchParamsSchema(FlaMarshmallow):
    """
    {'page': '1', 'per_page': '10', 'search_list': "['name', 'size','color']", 'keyword': 'seiko'}

    """
    page = fields.Integer()
    per_page = fields.Integer()
    search_list = fields.String()
    keyword = fields.String()
    delete_status = fields.Boolean()


class VariantSerializer(FlaMarshmallow):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    size = fields.String()
    color = fields.String()
    product_id = fields.Integer()

    # product = fields.Nested(ProductSerializer)

    @validates('name')
    def validate_name(self, value):
        if value == "":
            raise ValidationError('name can not be empty')
    
    @validates('product_id')
    def validate_product_id(self, value):
        if value == "":
            raise ValidationError('product_id can not be empty')

