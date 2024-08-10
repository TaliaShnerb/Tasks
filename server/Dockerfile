FROM node:18

WORKDIR /usr/src/app

ENV PORT=3000

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]