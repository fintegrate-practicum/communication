FROM node:lts-alpine

WORKDIR /app


COPY package*.json ./


RUN npm install

RUN npm run build

EXPOSE 4000


CMD [ "npm", "run","start:dev" ]

