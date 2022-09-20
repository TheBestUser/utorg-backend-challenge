FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY contracts ./contracts

RUN yarn

COPY . .

RUN yarn build && yarn test --ci

FROM node:18-alpine as modules

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

ENV NODE_ENV production

RUN yarn --prod --ignore-scripts

FROM node:18-alpine

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY --from=modules /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/src/main.js" ]
