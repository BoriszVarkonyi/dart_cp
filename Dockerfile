FROM python:3.9.15-alpine3.17 AS backend


RUN apk add --update gcc libc-dev linux-headers \
	mariadb-client mariadb-dev \
	&& rm -f /var/cache/apk/*

WORKDIR /var/www/dartagnan/backend
COPY backend/requirements.txt ./
RUN pip install -r requirements.txt
COPY . .