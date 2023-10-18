# Stage 1: Bygg Angular-applikationen
FROM node:latest AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Servera applikationen med NGINX
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
