import os

from app import app 
from flask import render_template

@app.route("/")
def index():

    # Use os.getenv("key") to get environment variables
    app_name = os.getenv("APP_NAME")

    # if app_name:
    #     return f"Hello from {app_name} running in a Docker container behind Nginx!"

    context = {
            'app_name': app_name }
    # return "Hello from Flask"
    return render_template('index.html', data=context)

