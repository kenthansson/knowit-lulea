# Stage 1: Bygg Angular-applikationen
FROM node:latest AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# RUN npm run build -- --base-href=/platspinnen/
RUN npm run build

# Stage 2: Servera applikationen med NGINX
FROM nginx:alpine
# Ta bort standard NGINX-konfigurationsfilen
RUN rm /etc/nginx/conf.d/default.conf
# Kopiera den anpassade NGINX-konfigurationsfilen
COPY default.conf /etc/nginx/conf.d/
COPY --from=build /app/dist/frontend /usr/share/nginx/html
