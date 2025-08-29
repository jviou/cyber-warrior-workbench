FROM node:20-alpine
WORKDIR /app

# Copie les manifests d'abord (cache Docker)
COPY package*.json ./

# Outils pour modules natifs (au cas où)
RUN apk add --no-cache python3 make g++

# Installe les deps (dev incluses)
RUN npm install

# Copie le reste du projet
COPY . .

# Expose le port Vite dev
EXPOSE 4173

# Lance le serveur de dev (binaire Vite)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4173"]
