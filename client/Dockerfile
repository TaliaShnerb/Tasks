FROM node:18

WORKDIR /usr/src/app

ENV REACT_APP_API_URL=http://localhost:5000

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

