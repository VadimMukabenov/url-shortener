# syntax=docker/dockerfile:1
# Установка базового образа Node.js
FROM node:18-alpine

# Установка рабочей директории внутри контейнера
WORKDIR  /usr/src/app

# Копирование package.json и package-lock.json для установки зависимостей
COPY package*.json ./

#Hack (https://github.com/npm/cli/issues/2011) для ускорения загрузки
RUN mkdir node_modules

# Установка зависимостей
# RUN npm ci --prefer-offline
RUN npm ci

# Копирование остальных файлов проекта
COPY . .

# Определение переменной окружения NODE_ENV в production
ENV NODE_ENV=production

# Определение порта, на котором будет работать приложение
EXPOSE 3000

# Run the migrate command which runs the migrations
# RUN npm run migration:run

# Run the build command which creates the production bundle
RUN npm run build

# Start the server using the production build
# CMD [ "node", "dist/main.js" ]
