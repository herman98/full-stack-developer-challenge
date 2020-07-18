from flask import Response, json, request
from marshmallow import ValidationError
from app import db

from app.models import Product, Variant
from app.common import FlaResource

from .queryset import ProductsQuerySet
from .schemas import ProductSerializer

class ProductListController(FlaResource):

    def get(self):
        """
        Request Body:
            page            int
            per_page        int
            search_list     Array
            keyword         String
            status          boolean (1=active, 0=inactive)

        Response:
            products          Array
        """
        print("ProductListController::GET")
        params = request.args.to_dict()

        # make query
        qs = ProductsQuerySet(params)
        if qs.errors:
            return self.response_v2(status=400,
                                    message="validation error",
                                    reason=qs.errors)

        # order by
        qs.order_by(Product.id.desc())

        # query result
        products = qs.pagination()
        products_response = ProductSerializer().dump(products, many=True)

        response_data = {
            "products": products_response,
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


class ProductController(FlaResource):
	
    # @oauth.require_oauth('client_app')
    def get(self, product_id):
        print("ProductController::GET")

        # variant_params = request.args.to_dict()

        # product
        product = Product.query.get(product_id)
        if not product:
            return self.response_v2(status=404, error="NOT FOUND")
        product_s = ProductSerializer().dump(product)

        # # variant
        # variant_params['product_id'] = product_id
        # variants = get_variant(product_id)

        # # Cover image
        # image_logo = get_logo_image(variants['spaces'])

        response_data = {
            "product": product_s
            # "variants": variants,
            # "cover_image": cover_image
        }

        return self.response_v2(status=200, 
                data=response_data,
                message="OK")
    
    def post(self):
        print("ProductController::POST")

        # Get data
        # form = request.form
        data = json.loads(request.data)
        print(f'data: {data}')

        # Validation
        try:
            valid_data = ProductSerializer().load(data)
        except ValidationError as error:
            print(error.messages)
            return self.response_v2(status=400, reason=error)


        # Add data
        product = Product(**valid_data)
        try:
            db.session.add(product)
            db.session.flush()  # add without commiting
            db.session.refresh(product)
        except Exception as e:
            db.session.rollback()
            return self.response_v2(status=400,
                                    message="Failed to add product",
                                    reason=e)

        print("product_id: {}".format(product.id))

        # # Upload file
        # if request.files:
        #     file = request.files["logo"]
        #     s3_products = HostBrandLogo(product_id=product.id, file=file)
        #     s3_products.upload()

        #     # Update logo
        #     product.logo = s3_products.get_full_url()

        try:
            db.session.commit()
        except Exception as e:
            return self.response_v2(status=400,
                                    message="Failed to add product",
                                    reason=e)

        product_s = ProductSerializer().dump(product)

        response_data = {
            "product": product_s
        }

        return self.response_v2(status=200, 
                data=response_data, 
                message="Success add product")
    
    def put(self, product_id):
        print("ProductController::PUT")

        # Get data
        # form = request.form
        data = json.loads(request.data)
        print(f'data: {data}')

        # Validation
        try:
            valid_data = ProductSerializer().load(data)
        except ValidationError as error:
            print(error.messages)
            return self.response_v2(status=400, reason=error)

        # product
        products = Product.query\
            .filter(Product.id == product_id)
        if products.count() < 1:
            return self.response_v2(status=400, error="product doesn't exist")
        
        # edit field
        product = products.first()
        product.name = valid_data['name']
        product.description = valid_data['description']
        # FILTER by logo_id
        if 'logo_id' in data:
            product.logo_id = None if valid_data['logo_id'] == 0 else valid_data['logo_id']

        # update data
        try:
            db.session.add(product)
            db.session.flush()  # add without commiting
            db.session.refresh(product)
        except Exception as e:
            db.session.rollback()
            return self.response_v2(status=400,
                                    message="Failed to add product",
                                    reason=e)

        print("update product_id: {}".format(product.id))
        try:
            db.session.commit()
        except Exception as e:
            return self.response_v2(status=400,
                                    message="Failed to update product",
                                    reason=e)

        msg_success = f'product id: {product.id} successfully updated'
        product_s = ProductSerializer().dump(product)

        response_data = {
            "product": product_s
            # "variants": variants,
            # "cover_image": cover_image
        }

        return self.response_v2(status=200, 
                data=response_data,
                message=msg_success)
    
    def delete(self, product_id):
        print("ProductController::DELETE")

        # product
        product = Product.query.get(product_id)
        if not product:
            return self.response_v2(status=404, error="NOT FOUND")
        
        #delete product
        try:
            db.session.delete(product)
            db.session.commit()
        except Exception as e:
            #delete product
            msg_fail = f'Failed to delete product id: {product.id}'
            return self.response_v2(status=400,
                                    message=msg_fail,
                                    reason=e)
        
        msg_success = f'product id: {product.id} successfully deleted'
        return self.response_v2(status=200, 
                data=[],
                message=msg_success)