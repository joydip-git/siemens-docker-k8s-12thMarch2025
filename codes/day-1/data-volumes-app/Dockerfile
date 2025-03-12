FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .
# ARG DEFAULT_PORT=80
# ENV PORT ${DEFAULT_PORT}
# ENV PORT=3000   
EXPOSE ${PORT}

CMD [ "node", "server.js" ]