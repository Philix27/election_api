# FROM node:lts-alpine
FROM node:14-alpine3.15
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
RUN chown -R node /app
USER node
CMD ["npm", "start"]
