FROM node:20-slim

WORKDIR /app

# Install openssl (required by Prisma on Debian slim)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package.json and prisma schema first
# (prisma schema is needed for postinstall which runs prisma generate)
COPY package.json ./
COPY prisma ./prisma/

# Install all dependencies
# postinstall script automatically runs prisma generate
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the NestJS app
RUN npm run build 2>&1 && echo "=== dist contents ===" && ls -laR dist/

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]
