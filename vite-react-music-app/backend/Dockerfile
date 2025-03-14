# Sử dụng node image
FROM node:22.14.0

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng cho backend
EXPOSE 5000

# Khởi động ứng dụng
CMD ["npm", "start"]