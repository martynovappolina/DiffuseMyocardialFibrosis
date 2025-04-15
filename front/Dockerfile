FROM node:19.5.0-alpine
WORKDIR /
COPY front/package.json package.json
RUN npm install
COPY front .
CMD ["npm", "start"]
