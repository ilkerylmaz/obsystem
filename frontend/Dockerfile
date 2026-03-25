FROM node:20-alpine

WORKDIR /app

# Sadece bağımlılıkları kopyala ve yükle (Cache avantajı)
COPY package*.json ./
RUN npm install

# Geri kalan her şeyi kopyala
COPY . .

# Next.js geliştirme portu
EXPOSE 3000

# Dinamik güncelleme için DEV modunda çalıştır
CMD ["npm", "run", "dev"]