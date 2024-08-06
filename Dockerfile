FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 4000

ENV MONGO_URI=${MONGO_URI}

CMD [ "npm", "run", "start:dev" ]