# Dockerfile for React App
FROM node:22

WORKDIR /usr/src/app

COPY package.json package-lock.json ./



COPY . .

EXPOSE 3000

CMD ["npm", "start"]
