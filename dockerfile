FROM node:23-alpine

WORKDIR /app 

COPY yarn.lock package.json tsconfig.json ./

RUN yarn install

COPY src ./src

RUN yarn tsc

EXPOSE 3000

CMD ["node", "src/dist/app.js"]
