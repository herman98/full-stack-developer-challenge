FROM python:alpine3.7 

LABEL maintainer="budi.hermansyah.3g@gmail.com"

COPY . /flask_backend_api

WORKDIR /flask_backend_api

RUN pip install --upgrade pip

RUN pip install -r requirements.txt 

EXPOSE 8080 

ENTRYPOINT [ "python" ] 
CMD [ "app.py" ] 