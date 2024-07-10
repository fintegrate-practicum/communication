
FROM node:18
# --- NETFREE CERT INTSALL ---
ADD https://netfree.link/dl/unix-ca.sh /home/netfree-unix-ca.sh 
RUN cat  /home/netfree-unix-ca.sh | sh
ENV NODE_EXTRA_CA_CERTS=/etc/ca-bundle.crt
ENV REQUESTS_CA_BUNDLE=/etc/ca-bundle.crt
ENV SSL_CERT_FILE=/etc/ca-bundle.crt
# --- END NETFREE CERT INTSALL ---
WORKDIR /app

COPY . /app

RUN npm i -g nodemon


# RUN npm install @nestjs/common

RUN npm install @nestjs/core

RUN npm i reflect-metadata

RUN npm run build

EXPOSE 4156

CMD [ "node", "dist/main" ]






