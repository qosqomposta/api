# Etapa de construcción
FROM node:18 AS build

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar solo los archivos necesarios para instalar dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación
RUN pnpm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /usr/src/app

# Instalar pnpm en la imagen de producción
RUN npm install -g pnpm

# Copiar archivos necesarios desde la etapa de construcción
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml

# Instalar solo las dependencias de producción
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000

ENTRYPOINT ["node", "dist/main"]