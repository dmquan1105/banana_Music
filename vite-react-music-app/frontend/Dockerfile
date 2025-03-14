# Sử dụng Node.js để chạy ứng dụng Vite
FROM node:22.14.0

WORKDIR /app

# Sao chép package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Mở cổng cho Vite
EXPOSE 5173

# Chạy Vite server
CMD ["npm", "run", "dev", "--", "--host"]
