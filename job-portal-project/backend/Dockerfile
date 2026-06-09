# backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Untuk production, gunakan npm ci lebih aman, tetapi jika ada kendala lock file bisa pakai npm install
RUN npm ci --only=production || npm install --only=production

COPY . .

EXPOSE 5005

CMD ["node", "server.js"]