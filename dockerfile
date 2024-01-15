ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-slim as base

WORKDIR /app

FROM base as build

COPY --link package.json package-lock.json ./
RUN npm i
RUN npm prune

COPY --link . .
RUN npm run build

EXPOSE 7000

CMD ["node", "./dist/main.js"]
