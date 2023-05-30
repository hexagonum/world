#!/bin/sh

apt-get update -y && apt-get install -y openssl
yarn install
yarn prisma:prod
yarn build:api
