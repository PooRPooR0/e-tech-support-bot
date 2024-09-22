FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install pm2 -g

RUN yarn

COPY . .

EXPOSE 8080

CMD ["pm2-runtime", "index.js"]