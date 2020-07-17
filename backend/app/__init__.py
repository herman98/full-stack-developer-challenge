from flask import Flask

import mysql.connector

app = Flask(__name__)


# config = {
#         'user': 'root',
#         'password': 'root',
#         'host': 'db',
#         'port': '3306',
#         'database': 'knights'
#     }
# connection = mysql.connector.connect(**config)

from app import views