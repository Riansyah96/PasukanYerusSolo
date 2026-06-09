# frontend/Dockerfile
# Gunakan Node.js 20 untuk kompatibilitas
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

# Gunakan npm install (bukan npm ci) untuk mengatasi ketidaksesuaian lock file
RUN npm install

COPY . .

RUN npm run build

# Production stage dengan nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]