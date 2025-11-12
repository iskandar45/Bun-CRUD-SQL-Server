# Gunakan base image Bun
FROM oven/bun:1.1.24

WORKDIR /app

# Copy semua file project
COPY . .

# Install dependencies
RUN bun install

# Expose port app
EXPOSE 3000

# Jalankan aplikasi
CMD ["bun", "run", "src/index.ts"]
