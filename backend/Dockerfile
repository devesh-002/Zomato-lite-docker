FROM node:16

COPY package*.json ./

RUN npm install --silent

COPY . .
EXPOSE 4000

CMD ["npm","start"]