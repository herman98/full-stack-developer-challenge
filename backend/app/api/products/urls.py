from .views import ProductListController, ProductController
from .. import api, app_bp

api.add_resource(ProductListController, '/products')
api.add_resource(ProductController, '/product/<int:product_id>')
app_bp.add_url_rule("/product", 'add_product', ProductController().post, methods=['POST'])

# app_bp.add_url_rule("/product", 'get_product', ProductController().post, methods=['GET'])
# app_bp.add_url_rule("/product/<int:product_id>", 'update_product', ProductController().put, methods=['PUT'])
# app_bp.add_url_rule("/product/<int:product_id>", 'delete_product', ProductController().delete, methods=['DELETE'])
