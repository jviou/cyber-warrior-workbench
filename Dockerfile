FROM node:20-alpine

WORKDIR /app

# Copie uniquement les manifests pour tirer parti du cache Docker
COPY package.json package-lock.json ./

# Dépendances build (au cas où un module requiert node-gyp)
RUN apk add --no-cache python3 make g++

# Évite les prompts & accélère un peu
ENV NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false

# Installe les deps (plus tolérant que `npm ci`)
# Si tu veux retenter plus tard avec `npm ci`, on pourra.
RUN npm install

# Copie le reste du code
COPY . .

# Build de l'app
RUN npm run build

# Expose le port de Vite preview
EXPOSE 4173

# Sert le build via Vite preview (sans reverse proxy)
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
