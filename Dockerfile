FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 5174

ENV PORT 5174

ENV host 0.0.0.0

CMD [ "npm", "run", "start:dev" ]