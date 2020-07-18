from .views import ImageListController, ImageController
from .. import api, app_bp

#list api
api.add_resource(ImageListController, '/images')

# crud api
api.add_resource(ImageController, '/image/<int:image_id>')
app_bp.add_url_rule("/image", 'add_image', ImageController().post, methods=['POST'])

#link image with product and variant
app_bp.add_url_rule("/product/<int:product_id>/images", 'add_product_images', ImageController().post_product_images, methods=['POST'])
app_bp.add_url_rule("/variant/<int:variant_id>/images", 'add_variant_images', ImageController().post_variant_images, methods=['POST'])





