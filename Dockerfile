# ---- build ----
FROM node:20-alpine AS build
WORKDIR /app

# outils pour modules natifs si besoin
RUN apk add --no-cache python3 make g++

# copier manifests
COPY package.json package-lock.json ./

# install tolérant (si lock pas synchro)
RUN npm install --legacy-peer-deps

# build
COPY . .
RUN npm run build

# ---- run (serveur statique) ----
FROM node:20-alpine
WORKDIR /app
RUN npm i -g serve
COPY --from=build /app/dist ./dist

EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]
