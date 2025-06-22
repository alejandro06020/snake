# Etapa de construcción y test
FROM node:18 AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Ejecutar tests con Jest
RUN npm run test

# Etapa final de producción
FROM node:18

WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa anterior
COPY --from=builder /app /app

# Exponer el puerto que usa el servidor Express
EXPOSE 3000

# Comando por defecto para ejecutar la app
CMD ["node", "index.js"]
