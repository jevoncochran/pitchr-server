FROM node:20-slim

WORKDIR /app

# Install openssl (required by Prisma on Debian slim)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package.json and prisma schema first
COPY package.json ./
COPY prisma ./prisma/

# Install all dependencies
RUN npm install

# Generate Prisma client (dummy URL satisfies schema validation, no connection made)
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

# Copy the rest of the source code
COPY . .

# Build the NestJS app
RUN npm run build 2>&1 && echo "=== dist contents ===" && ls -laR dist/

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]
