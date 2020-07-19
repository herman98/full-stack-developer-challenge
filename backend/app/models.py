from datetime import datetime

from app import db
from sqlalchemy import (
    Column, DateTime, Boolean, Table, Float,
    String, Integer, Text, ForeignKey
)
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref

# BaseModel = declarative_base()

class BaseModelTimestamp(db.Model):
    __abstract__ = True

    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, nullable=True)
    del_status = Column(Boolean, default=False)
    deleted_at = Column(DateTime, nullable=True)


class User(BaseModelTimestamp):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(128), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.name


class MyProperty(BaseModelTimestamp):
    __tablename__ = 'properties'

    id = Column(Integer, primary_key=True)
    full_address = Column(String(128))
    class_description = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)


class PropertySelection(BaseModelTimestamp):
    __tablename__ = 'selections'

    property_id = Column(Integer, ForeignKey('properties.id'), primary_key=True)
    my_property = relationship('MyProperty')




product_images = Table('product_images',
    db.Model.metadata,
    Column('image_id', Integer, ForeignKey('images.id'), primary_key=True),
    Column('product_id', Integer, ForeignKey('products.id'), primary_key=True)
)

variant_images = Table('variant_images',
    db.Model.metadata,
    Column('image_id', Integer, ForeignKey('images.id'), primary_key=True),
    Column('variant_id', Integer, ForeignKey('variants.id'), primary_key=True)
)

class Image(BaseModelTimestamp):
    """
    The "Image" resource can have the following properties:

    - id: any type of unique id
    - url: the url of the image
    """
    __tablename__ = 'images'

    id = Column(Integer, primary_key=True)
    url = Column(String(128), nullable=False)


class Product(BaseModelTimestamp):
    """
    The "Products" resource should have the following properties:
    - id: any type of unique id
    - name: name of the product
    - description: description of the product
    - images: an list of associated images
    - logo_id: the primary logo for this images
    - created_at: timestamp
    - updated_at: timestamp
    """
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True)
    name = Column(String(128), nullable=False)
    description = Column('Descriptions', Text)
    logo_id = Column(Integer, ForeignKey('images.id'),
        nullable=True)
    logo = db.relationship("Image", backref="products_logo", lazy=True)

    # variants = relationship("Variant", back_populates="products", uselist=False)
    images = db.relationship('Image', secondary=product_images, lazy='dynamic',
        backref=db.backref('products', lazy='dynamic'))

    def __repr__(self):
        return '<Product %d-%r>' % (self.id, self.name)

class Variant(BaseModelTimestamp):
    """
    The "Variants" resource should have the following properties:

    - id: any type of unique id
    - product_id: id of the relevant product
    - name: name of the variant
    - size: size of the variant
    - color: color of the variant
    - images: an list of associated images
    - created_at: timestamp
    - updated_at: timestamp
    """
    __tablename__ = 'variants'

    id = Column(Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'),
        nullable=False)
    product = db.relationship('Product', backref='variants', lazy=True)

    name = Column(String(128), nullable=False)
    size = Column(String(64), nullable=False)
    color = Column(String(64), nullable=False)
    
    images = db.relationship('Image', secondary=variant_images, lazy='dynamic',
        backref=db.backref('Variant', lazy='dynamic'))
