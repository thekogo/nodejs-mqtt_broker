FROM node:14-alpine

WORKDIR /src

ADD package.json /src 

RUN npm i --silent
RUN npm install -g nodemon

COPY . . 

EXPOSE 5000

CMD ["nodemon", "-L", "index.js"]