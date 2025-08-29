# ---- build ----
FROM node:20-alpine AS build
WORKDIR /app

# Dépendances (et outils pour modules natifs)
COPY package.json package-lock.json ./
RUN apk add --no-cache python3 make g++
# tolérant aux peer deps (date-fns/react-day-picker, etc.)
RUN npm ci --legacy-peer-deps

# Build
COPY . .
RUN npm run build

# ---- run (serveur statique) ----
FROM node:20-alpine
WORKDIR /app
RUN npm i -g serve
COPY --from=build /app/dist ./dist

EXPOSE 4173
# sert le dossier dist, sans Vite preview (donc pas d'allowedHosts)
CMD ["serve", "-s", "dist", "-l", "4173"]

