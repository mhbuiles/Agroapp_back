FROM node:latest

WORKDIR /usr/src/

COPY . .

RUN npm install

EXPOSE 8000
VOLUME /usr/src/src/

CMD [ "npm" , "run" , "dev" ]
