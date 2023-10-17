# Ange den officiella Node.js-bilden som vår basbild
FROM node:14

# Sätt arbetskatalogen i Docker-bilden
WORKDIR /usr/src/app

# Kopiera `package.json` och `package-lock.json` (om den finns)
COPY package*.json ./

# Installera Angular CLI och applikationsberoenden
RUN npm install -g @angular/cli && npm install

# Kopiera applikationskoden till bilden
COPY . .

# Bygg appen
RUN ng build --prod

# Använd Nginx för att tjäna vår byggda app
FROM nginx:1.19.0-alpine

# Kopiera nginx-konfiguration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# Kopiera den byggda appen från byggstadiet till nginx-servingskatalog
COPY --from=0 /usr/src/app/dist/ditt-projektnamn /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
