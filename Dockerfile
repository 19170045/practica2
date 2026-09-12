FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
