FROM node:alpine3.21

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV DEFAULT_PORT=3000
ENV MESSAGE='server running using port: '
EXPOSE ${DEAFULT_PORT}

CMD [ "node", "server.js" ]