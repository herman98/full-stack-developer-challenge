from flask import Response, json, request
from marshmallow import ValidationError
from app import db

from app.models import Product, Image, Variant
from app.common import FlaResource

from ..products.schemas import ProductSerializer
from ..variants.schemas import VariantSerializer

from .queryset import SearchImageQuerySet
from .schemas import ImageSerializer

class ImageListController(FlaResource):

    def get(self):
        """
        Request Body:
            page            int
            per_page        int
            search_list     Array
            keyword         String
            status          boolean (1=active, 0=inactive)

        Response:
            images          Array
        """
        print("ImageListController::GET")
        params = request.args.to_dict()

        # make query
        qs = SearchImageQuerySet(params)
        if qs.errors:
            return self.response_v2(status=400,
                                    message="validation error",
                                    reason=qs.errors)

        # order by
        qs.order_by(Image.id.desc())

        # query result
        images = qs.pagination()
        images_response = ImageSerializer().dump(images, many=True)

        response_data = {
            "images": images_response,
            "paging": {
                "current_page": qs.get_page(),
                "per_page": qs.get_per_page(),
                "has_next": qs.has_next(),
                "count": qs.count()
            }
        }
        return self.response_v2(status=200, 
                data=response_data,
                message="OK")


class ImageController(FlaResource):
	
    # @oauth.require_oauth('client_app')
    def get(self, image_id):
        print("ImageController::GET")

        # image
        image = Image.query.get(image_id)
        if not image:
            return self.response_v2(status=404, error="Image Not Found")
        image_s = ImageSerializer().dump(image)

        response_data = {
            "image": image_s
        }

        return self.response_v2(status=200, 
                data=response_data,
                message="OK")
    
    # def get_by_product(self, product_id):
    #     print("ImageController::GET->get_by_product")

    #     # get product
    #     product = Product.query.get(product_id)
    #     if not product:
    #         return self.response_v2(status=404, error="Product Not Found")
        
    #     #query get images
    #     images = Image.query.filter(Image.product == product)
    #     image_s = ImageSerializer(many=True).dump(images)

    #     # Cover image
    #     # image_logo = get_logo_image(images['spaces'])

    #     response_data = {
    #         "image": image_s
    #         # "cover_image": cover_image
    #     }

    #     return self.response_v2(status=200, 
    #             data=response_data,
    #             message="OK")
    
    def post(self):
        print("ImageController::POST")

        # Get data
        # form = request.form
        data = json.loads(request.data)
        print(f'data: {data}')

        # Validation
        try:
            valid_data = ImageSerializer().load(data)
        except ValidationError as error:
            print(error.messages)
            return self.response_v2(status=400, reason=error)

        # Add data
        image = Image(**valid_data)
        try:
            db.session.add(image)
            db.session.flush()  # add without commiting
            db.session.refresh(image)
        except Exception as e:
            db.session.rollback()
            return self.response_v2(status=400,
                                    message="Failed to add image",
                                    reason=e)

        print("image_id: {}".format(image.id))

        try:
            db.session.commit()
        except Exception as e:
            return self.response_v2(status=400,
                                    message="Failed to add image",
                                    reason=e)

        image_s = ImageSerializer().dump(image)

        response_data = {
            "image": image_s
        }

        return self.response_v2(status=200, 
                data=response_data, 
                message="Success add image")
    
    def post_product_images(self, product_id):
        print("ImageController::POST->post_product_images")

        # Get data
        data = json.loads(request.data)
        print(f'data1: {data}')

        if len(data) <= 1:
            return self.response_v2(status=404, error="Image List IDs Not Found")

        # get product
        product = Product.query.get(product_id)
        if not product:
            return self.response_v2(status=404, error="Product Not Found")

        image_ids = [item['image_id'] for item in data]
        print(f'image_ids: {image_ids}')

        counting = 0
        images_obj = Image.query.filter(Image.id.in_(image_ids)).all()
        for image_item in images_obj:
            #validate if image id exists for specifik product_id
            x = Product.query.filter(Product.images.any(id=image_item.id)).count()
            print(f'x.count: {x}')
            if x == 0:
                product.images.append(image_item)
                counting = counting + 1

        # Add Link product images
        if counting == 0:
            return self.response_v2(status=404, error="No Product Link Image Not Found")

        try:
            db.session.add(product)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return self.response_v2(status=400,
                                    message="Failed to add multi image data",
                                    reason=e)

        product_s = ProductSerializer(exclude=('variants',)).dump(product)
        image_s = ImageSerializer(many=True).dump(images_obj)

        response_data = {
            "product": product_s,
            "image": image_s
        }

        return self.response_v2(status=200, 
                data=response_data, 
                message="Success add image")

    def post_variant_images(self, variant_id):
        print("ImageController::POST->post_variant_images")

        # Get data
        data = json.loads(request.data)
        print(f'data1: {data}')

        if len(data) <= 1:
            return self.response_v2(status=404, error="Image List IDs Not Found")

        # get variant
        variant = Variant.query.get(variant_id)
        if not variant:
            return self.response_v2(status=404, error="Variant Not Found")

        image_ids = [item['image_id'] for item in data]
        print(f'image_ids: {image_ids}')

        counting = 0
        images_obj = Image.query.filter(Image.id.in_(image_ids)).all()
        for image_item in images_obj:
            #validate if image id exists for specifik variant_id
            x = Variant.query.filter(Variant.images.any(id=image_item.id)).count()
            print(f'x.count: {x}')
            if x == 0:
                variant.images.append(image_item)
                counting = counting + 1

        # Add Link variant images
        if counting == 0:
            return self.response_v2(status=404, error="No Variant Link Image Not Found")

        try:
            db.session.add(variant)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return self.response_v2(status=400,
                                    message="Failed to add multi image data",
                                    reason=e)

        variant_s = VariantSerializer().dump(variant)
        image_s = ImageSerializer(many=True).dump(images_obj)

        response_data = {
            "variant": variant_s,
            "image": image_s
        }

        return self.response_v2(status=200, 
                data=response_data, 
                message="Success add image")

    def put(self, image_id):
        print("ImageController::PUT")

        # Get data
        # form = request.form
        data = json.loads(request.data)
        print(f'data: {data}')

        # Validation
        try:
            valid_data = ImageSerializer().load(data)
        except ValidationError as error:
            print(error.messages)
            return self.response_v2(status=400, reason=error)

        # image
        images = Image.query\
            .filter(Image.id == image_id)
        if images.count() < 1:
            return self.response_v2(status=400, error="image doesn't exist")
        
        # edit field
        image = images.first()
        image.url = valid_data['url']

        # update data
        try:
            db.session.add(image)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return self.response_v2(status=400,
                                    message="Failed to add image",
                                    reason=e)

        print("update image_id: {}".format(image.id))
        msg_success = f'image id: {image.id} successfully updated'
        image_s = ImageSerializer().dump(image)

        response_data = {
            "image": image_s
        }

        return self.response_v2(status=200, 
                data=response_data,
                message=msg_success)
    
    def delete(self, image_id):
        print("ImageController::DELETE")

        # image
        image = Image.query.get(image_id)
        if not image:
            return self.response_v2(status=404, error="NOT FOUND")
        
        #delete image
        try:
            db.session.delete(image)
            db.session.commit()
        except Exception as e:
            #delete image
            msg_fail = f'Failed to delete image id: {image.id}'
            return self.response_v2(status=400,
                                    message=msg_fail,
                                    reason=e)
        
        msg_success = f'image id: {image.id} successfully deleted'
        return self.response_v2(status=200, 
                data=[],
                message=msg_success)