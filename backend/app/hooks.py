ALLOWED_ORIGIN = '*'
ALLOWED_METHODS = '*'


def apply_hooks(app):
    @app.after_request
    def cors(response):
        response.headers['Access-Control-Allow-Origin'] = ALLOWED_ORIGIN
        response.headers['Access-Control-Allow-Methods'] = ALLOWED_METHODS
        return response