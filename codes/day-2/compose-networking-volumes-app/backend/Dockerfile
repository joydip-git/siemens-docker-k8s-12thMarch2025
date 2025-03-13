FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

# ENV MONGODB_USERNAME=joydip
# ENV MONGODB_PASSWORD=secret

CMD ["node", "./app.js"]