FROM node:lts-alpine

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .
RUN npm run build

EXPOSE 7000

CMD ["node", "./dist/main.js"]