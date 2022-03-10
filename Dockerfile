FROM node:16

WORKDIR /chords

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 9001

CMD ["node", "dist/server.js"]