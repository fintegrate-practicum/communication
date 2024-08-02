FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 4000

ENV PORT 4000

CMD ["npm", "start"]
