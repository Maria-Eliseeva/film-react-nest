FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

ARG VITE_API_URL="https://api.film.mary.nomorepartiessite.ru/api/afisha"

RUN VITE_API_URL=${VITE_API_URL} npm run build