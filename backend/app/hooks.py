ALLOWED_ORIGIN = '*' #['http://localhost:3000', 'http://localhost:80', 'http://localhost']
ALLOWED_METHODS = '*' #'POST, GET, OPTIONS, PUT, DELETE'


def add_cors_headers(response):
    # response.headers['Content-Type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = ALLOWED_ORIGIN
    response.headers['Access-Control-Allow-Methods'] = ALLOWED_METHODS
    # response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    response.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers','Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    response.headers['Access-Control-Allow-Credentials'] = 'false'

    return response

    # bp.after_request(add_cors_headers)
    # app.register_blueprint(bp)

def apply_hooks(app):
    @app.after_request
    def cors(response):
        return add_cors_headers(response)