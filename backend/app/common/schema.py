from datetime import datetime
from marshmallow import Schema, ValidationError


class FlaMarshmallow(Schema):

    def check_time_format(self, value, valid_format="%H:%M"):
        """ Marshmallow validation
        Params:
            value: string of time
        """
        try:
            datetime.strptime(value, valid_format)
        except:
            raise ValidationError(
                'valid serve_time is {}'.format(valid_format))

    def check_date_format(self, value, valid_format="%Y-%m-%d"):
        """ Marshmallow validation
        Params:
            value: string of date
        """
        try:
            datetime.strptime(value, valid_format)
        except:
            raise ValidationError(
                'valid date format is {}'.format(valid_format))

    @staticmethod
    def exclude(list_key, singleData):
        """remove attribute from single data"""
        if not singleData:
            return

        for key in list_key:
            if key in singleData:
                del singleData[key]

        return singleData
