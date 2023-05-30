FROM node

LABEL author="hieudoanm"
LABEL maintainer="hieumdoan@gmail.com"
LABEL version="1.0"

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY . /home/node/app

RUN yarn install
RUN yarn prisma:prod
RUN yarn build:api

EXPOSE $PORT

CMD ["yarn", "start:api"]
