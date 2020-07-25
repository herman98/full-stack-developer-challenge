import ast
from sqlalchemy import or_, and_
from marshmallow import ValidationError

from app.common.helpers import get_or_default, has_next
from app.common.helpers import remove_key_thathas_emptystring_value
from app.models import Product

from .schemas import ProductsParamsSchema


class ProductsQuerySet():
    """
        request params class method
    """
    def __init__(self, params):
        self.params = params
        self.objects = None
        self.errors = {}

        # default value
        self.page = 1
        self.per_page = 10
        self.search_list = ['name']

        # do
        self.clean_params()
        self.filter()

    def clean_params(self):
        print("ProductsQuerySet=>clean_params")

        # Clean params
        params = remove_key_thathas_emptystring_value(self.params)
        # print(f'params: {params}')
        try:
            self.params = ProductsParamsSchema().load(params)
        except ValidationError as error:
            print(error.messages)
            self.errors = error.messages

    def filter(self):
        if self.errors:
            return None

        # default value
        self.search_list = get_or_default(
            'search_list', self.params, self.search_list)

        conds_or = []
        conds_and = []

        # FILTER by deleted_at
        if 'delete_status' in self.params:
            if self.params['delete_status'] == 1:
                conds_and = [Product.del_status == True]

        # FILTER by keyword
        if 'keyword' in self.params:
            keyword = self.params['keyword']
            if 'name' in self.search_list:
                conds_or.append(Product.name.like(
                    '%{}%'.format(keyword)))
            if 'description' in self.search_list:
                conds_or.append(Product.description.like(
                    '%{}%'.format(keyword)))

        # FILTER and_ & or_
        if len(conds_or) >= 1:
            self.objects = Product.query.filter(
                and_(*conds_and), or_(*conds_or))
        else:
            self.objects = Product.query.filter(
                and_(*conds_and))

        return self.objects

    def order_by(self, order_by_in, object_in=None):
        if self.objects and object_in == None:
            self.objects = self.objects.order_by(order_by_in)
        elif object_in:
            self.objects = object_in.order_by(order_by_in)
        return self.objects

    def count(self):
        return self.objects.count() if self.objects else None

    def pagination(self):
        # pagination
        self.page = int(get_or_default('page', self.params, self.page))
        self.per_page = int(get_or_default(
            'per_page', self.params, self.per_page))
        return self.objects.paginate(page=self.page,
                                     per_page=self.per_page,
                                     error_out=False).items

    def get_page(self):
        return self.page

    def get_per_page(self):
        return self.per_page

    def has_next(self):
        count = self.objects.count()
        return has_next(count, self.page, self.per_page)
