FROM node:lts-alpine


WORKDIR /app


COPY package*.json ./

EXPOSE 4000

RUN npm install

COPY . .


EXPOSE 4000


CMD [ "npm", "run","start:dev" ]

