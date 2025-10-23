# ===== Stage 1: deps (instala COM devDependencies) =====
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev

# ===== Stage 2: build (compila TS usando node_modules do stage deps) =====
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json tsconfig.json nest-cli.json ./
COPY src ./src
RUN ./node_modules/.bin/tsc -p tsconfig.json

# ===== Stage 3: runtime (prod leve) =====
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
