FROM kongbg/node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install cnpm -g --registry=https://registry.npm.taobao.org
RUN cnpm install
COPY . .
EXPOSE 21114
CMD [ "node", "./src/app.js" ]