FROM python:alpine3.7 
COPY . /flask_backend_api
WORKDIR /flask_backend_api
RUN pip install --upgrade pip
RUN pip install -r requirements.txt 
EXPOSE 5001 
ENTRYPOINT [ "python" ] 
CMD [ "app.py" ] 