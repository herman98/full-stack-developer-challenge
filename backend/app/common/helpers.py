import base64
import uuid

# import moment
from datetime import datetime


def validate(data, **kwargs):
    required = kwargs.get('required', [])

    for field in required:
        if data[field] not in data:
            return False

    return True


def get_or_default(key, kwargs, default_value):
    try:
        if key in kwargs and kwargs[key] not in (None, '', 'null'):
            return kwargs[key]
    except:
        return default_value

    return default_value


def is_value_allowed(value, allowed_value):
    if value not in (allowed_value):
        return False

    return True


def has_next(total_data, page, per_page):
    max_page = int(total_data / per_page) + 1
    if page < max_page:
        return True

    return False


def remove_key_thathas_emptystring_value(data, many=False):
    data = [data] if not many else data

    new_data = []
    for d in data:
        new_data.append({k: v for k, v in d.items() if v != ""})

    if many:
        return new_data
    else:
        return new_data[0]


def map_key(array_of_dict, key):
    try:
        new_array = {_dict[key]: _dict for _dict in array_of_dict}
    except:
        return {}

    return new_array


def split_fullname(fullname):
    name = fullname.split(' ', 1)
    first_name = name[0]
    try:
        last_name = name[1]
    except:
        last_name = ""

    return first_name, last_name


def generate_uuid():
    return base64.b32encode(uuid.uuid4().bytes).strip('=').lower()


# def first_date_of_month():
#     return datetime.now().date().strftime('%Y-%m-01')


# def last_date_of_month():
#     return moment.now().add(months=1).date.strftime('%Y-%m-01')
