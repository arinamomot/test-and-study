FROM node:14
WORKDIR /test-and-study
COPY package.json ./
RUN npm install
COPY . .
ENV PORT=5000
ENV NODE_ENV='production'

EXPOSE 5000
CMD npm start