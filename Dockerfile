FROM node:20-alpine

WORKDIR /app

# Installer dépendances
COPY package*.json ./
RUN npm ci

# Copier tout le code et builder
COPY . .
RUN npm run build

# Exposer le port de Vite preview (4173 par défaut)
EXPOSE 4173

# Lancer le serveur Vite en mode preview
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
