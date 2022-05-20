FROM node:14
WORKDIR /test-and-study
COPY package.json .
RUN npm install
COPY . .
CMD npm start