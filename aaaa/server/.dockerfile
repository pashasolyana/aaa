FROM node:alpine
RUN yarn global add pm2@latest
RUN apk add --no-cache file
RUN apk --update add imagemagick
WORKDIR /app
COPY package*.json package-lock.json ./
COPY . /app
RUN npm install
ENV PORT 5000
ENV USER_NAME web_site_user
ENV PASSWORD 5f7ZJzNW7K
ENV COMPANY_CODE LUB
ENV MARKET_PVZ 15
ENV CLIENT_VERSION MOBILE


EXPOSE $PORT
CMD ["npm", "start"]
