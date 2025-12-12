# 1. Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production=false

COPY . .
RUN npm run build

# 2. Run Stage
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
