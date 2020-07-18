from .views import VariantListController, VariantController
from .. import api, app_bp

#list api
api.add_resource(VariantListController, '/variants')
app_bp.add_url_rule("/variants/<int:product_id>/list", 'list_variant_by_product', VariantController().get_by_product, methods=['GET'])

# crud api
api.add_resource(VariantController, '/variant/<int:variant_id>')
app_bp.add_url_rule("/variant", 'add_variant', VariantController().post, methods=['POST'])

# multiple new variant by product id
app_bp.add_url_rule("/variant/<int:product_id>/add", 'add_multiple_variant', VariantController().post_multiple, methods=['POST'])


