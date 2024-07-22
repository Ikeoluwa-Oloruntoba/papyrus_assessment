FROM node:21

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm update

COPY . .

ENTRYPOINT ["/bin/sh", "-c", "npm run start:dev"]