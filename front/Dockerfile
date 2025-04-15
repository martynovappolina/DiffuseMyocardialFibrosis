FROM node:19.5.0-alpine
RUN mkdir -p /app
RUN mkdir -p /front_build
WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install
COPY . /app
CMD npm start
