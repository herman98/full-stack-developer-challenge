FROM python:alpine3.7 

LABEL maintainer="budi.hermansyah.3g@gmail.com"

COPY . /flask_backend_api

WORKDIR /flask_backend_api

RUN pip install --upgrade pip

# RUN pip install -r requirements.txt 
RUN set -e; \
	apk add --no-cache --virtual .build-deps \
		gcc \
		libc-dev \
		linux-headers \
	; \
	pip install -r requirements.txt; \
	apk del .build-deps;

# EXPOSE 8080 

# ENTRYPOINT [ "python" ] 
# CMD [ "run.py" ] 

CMD ["uwsgi", "wsgi.ini"]