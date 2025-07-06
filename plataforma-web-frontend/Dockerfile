# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir con 'serve'
FROM node:18-alpine

WORKDIR /app

# Instalar servidor estático
RUN npm install -g serve

# Copiar archivos construidos desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Exponer el puerto donde 'serve' ejecutará la app
EXPOSE 80

# Health check opcional
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget -q --spider http://localhost:80 || exit 1

# Comando por defecto para ejecutar la app
CMD ["serve", "-s", "dist", "-l", "80"]
