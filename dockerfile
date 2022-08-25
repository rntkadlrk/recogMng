# syntax=docker/dockerfile:1
FROM node:current-slim
RUN npm install
WORKDIR /app
COPY . .
CMD ["npm", "dev"]
EXPOSE 3000 
