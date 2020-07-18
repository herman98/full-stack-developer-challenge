from flask import Response, json, request
from marshmallow import ValidationError
from app import db

from app.models import Product, Variant
from app.common import FlaResource

from .queryset import SearchVarianQuerySet
from .schemas import VariantSerializer

class VariantListController(FlaResource):

    def get(self):
        """
        Request Body:
            page            int
            per_page        int
            search_list     Array
            keyword         String
            status          boolean (1=active, 0=inactive)

        Response:
            variants          Array
        """
        print("VariantListController::GET")
        params = request.args.to_dict()

        # make query
        qs = SearchVarianQuerySet(params)
        if qs.errors:
            return self.response_v2(status=400,
                                    message="validation error",
                                    reason=qs.errors)

        # order by
        qs.order_by(Variant.id.desc())

        # query result
        variants = qs.pagination()
        variants_response = VariantSerializer().dump(variants, many=True)

        response_data = {
            "variants": variants_response,
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


class VariantController(FlaResource):
	
    # @oauth.require_oauth('client_app')
    def get(self, variant_id):
        print("VariantController::GET")

        # variant
        variant = Variant.query.get(variant_id)
        if not variant:
            return self.response_v2(status=404, error="Variant Not Found")
        variant_s = VariantSerializer().dump(variant)

        response_data = {
            "variant": variant_s
        }

        return self.response_v2(status=200, 
                data=response_data,
                message="OK")
    
    def get_by_product(self, product_id):
        print("VariantController::GET->get_by_product")

        # get product
        product = Product.query.get(product_id)
        if not product:
            return self.response_v2(status=404, error="Product Not Found")
        
        #query get variants
        variants = Variant.query.filter(Variant.product == product)
        variant_s = VariantSerializer(many=True).dump(variants)

        # Cover image
        # image_logo = get_logo_image(variants['spaces'])

        response_data = {
            "variant": variant_s
            # "cover_image": cover_image
        }

        return self.response_v2(status=200, 
                data=response_data,
                message="OK")
    
    def post(self):
        print("VariantController::POST")

        # Get data
        # form = request.form
        data = json.loads(request.data)
        print(f'data: {data}')

        # Validation
        try:
            valid_data = VariantSerializer().load(data)
        except ValidationError as error:
            print(error.messages)
            return self.response_v2(status=400, reason=error)

        # Add data
        variant = Variant(**valid_data)
        try:
            db.session.add(variant)
            db.session.flush()  # add without commiting
            db.session.refresh(variant)
        except Exception as e:
            db.session.rollback()
            return self.response_v2(status=400,
                                    message="Failed to add variant",
                                    reason=e)

        print("variant_id: {}".format(variant.id))

        try:
            db.session.commit()
        except Exception as e:
            return self.response_v2(status=400,
                                    message="Failed to add variant",
                                    reason=e)

        variant_s = VariantSerializer().dump(variant)

        response_data = {
            "variant": variant_s
        }

        return self.response_v2(status=200, 
                data=response_data, 
                message="Success add variant")
    
    def post_multiple(self, product_id):
        print("VariantController::POST->post_multiple")

        # Get data
        # form = request.form
        data = json.loads(request.data)
        print(f'data1: {data}')

        if len(data) <= 1:
            return self.response_v2(status=404, error="Variant New Data Not Found")

        # get product
        product = Product.query.get(product_id)
        if not product:
            return self.response_v2(status=404, error="Product Not Found")

        for item in data:
            item['product_id'] = product_id

        print(f'data2: {data}')

        # Validation
        try:
            valid_data = VariantSerializer(many=True).load(data)
        except ValidationError as error:
            print(error.messages)
            return self.response_v2(status=400, reason=error)

        # Add data
        variants = [Variant(**valid_dt) for valid_dt in valid_data]
        try:
            db.session.add_all(variants)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return self.response_v2(status=400,
                                    message="Failed to add multi variant data",
                                    reason=e)

        variant_s = VariantSerializer(many=True).dump(variants)

        response_data = {
            "variant": variant_s
        }

        return self.response_v2(status=200, 
                data=response_data, 
                message="Success add variant")

    def put(self, variant_id):
        print("VariantController::PUT")

        # Get data
        # form = request.form
        data = json.loads(request.data)
        print(f'data: {data}')

        # Validation
        try:
            valid_data = VariantSerializer().load(data)
        except ValidationError as error:
            print(error.messages)
            return self.response_v2(status=400, reason=error)

        # variant
        variants = Variant.query\
            .filter(Variant.id == variant_id)
        if variants.count() < 1:
            return self.response_v2(status=400, error="variant doesn't exist")
        
        # edit field
        variant = variants.first()
        variant.name = valid_data['name']
        variant.color = valid_data['color']
        variant.size = valid_data['size']

        # product_id
        if 'product_id' in data:
            variant.product_id = valid_data['product_id']

        # update data
        try:
            db.session.add(variant)
            db.session.flush()  # add without commiting
            db.session.refresh(variant)
        except Exception as e:
            db.session.rollback()
            return self.response_v2(status=400,
                                    message="Failed to add variant",
                                    reason=e)

        print("update variant_id: {}".format(variant.id))
        try:
            db.session.commit()
        except Exception as e:
            return self.response_v2(status=400,
                                    message="Failed to update variant",
                                    reason=e)

        msg_success = f'variant id: {variant.id} successfully updated'
        variant_s = VariantSerializer().dump(variant)

        response_data = {
            "variant": variant_s
            # "variants": variants,
            # "cover_image": cover_image
        }

        return self.response_v2(status=200, 
                data=response_data,
                message=msg_success)
    
    def delete(self, variant_id):
        print("VariantController::DELETE")

        # variant
        variant = Variant.query.get(variant_id)
        if not variant:
            return self.response_v2(status=404, error="NOT FOUND")
        
        #delete variant
        try:
            db.session.delete(variant)
            db.session.commit()
        except Exception as e:
            #delete variant
            msg_fail = f'Failed to delete variant id: {variant.id}'
            return self.response_v2(status=400,
                                    message=msg_fail,
                                    reason=e)
        
        msg_success = f'variant id: {variant.id} successfully deleted'
        return self.response_v2(status=200, 
                data=[],
                message=msg_success)