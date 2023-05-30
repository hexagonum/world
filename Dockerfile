FROM node

LABEL author="hieudoanm"
LABEL maintainer="hieumdoan@gmail.com"
LABEL version="1.0"

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY . /home/node/app

ARG POSTGRESQL_URL
ENV POSTGRESQL_URL=$POSTGRESQL_URL
## Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl
RUN openssl version

RUN yarn install
RUN yarn prisma:prod
RUN yarn build:api

EXPOSE $PORT

CMD ["yarn", "start:api"]
