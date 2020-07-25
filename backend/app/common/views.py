from flask import jsonify, Response, json
from flask_restful import Resource


class FlaResource(Resource):
    def response(self, data=[], **kwargs):
        return self.response_v2(data, kwargs)

    def response_v2(self, data=[], **kwargs):
        status = kwargs.get('status', 200)
        message = kwargs.get('message', '')
        reason = kwargs.get('reason', '')
        error = kwargs.get('error', None)

        if error:
            message = reason = error
        res = {
            "header": {
                "status": status,
                "message": message,
                "reason": reason
            },
            "data": data
        }
        return Response(status=status,
                        response=json.dumps(res),
                        mimetype='application/json')

    def not_found(self, **kwargs):
        status = 404
        message = kwargs.get('message', 'NOT FOUND')
        reason = kwargs.get('reason', 'NOT FOUND')

        res = {
            "header": {
                "status": status,
                "message": message,
                "reason": reason
            },
            "data": []
        }

        return Response(status=status,
                        response=json.dumps(res),
                        mimetype='application/json')
    