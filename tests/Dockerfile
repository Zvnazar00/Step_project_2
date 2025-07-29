FROM node:14

WORKDIR /tests

COPY ../app/package*.json ./
RUN npm install

COPY ../app ./
COPY . .

CMD ["npm", "test"]