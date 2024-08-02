FROM node:20.16-alpine

COPY package.json /usr/src/carly/
COPY .. /usr/src/carly/

WORKDIR /usr/src/carly

RUN npm install