FROM node:20
WORKDIR /wallet_frontend

COPY package*.json ./ 
COPY . .

RUN npm install
EXPOSE 3000

CMD ["npm","run","dev"]