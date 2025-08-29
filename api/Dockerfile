FROM node:20-bookworm-slim
WORKDIR /api

# Dépendances build + OpenSSL (nécessaire pour Prisma)
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src
COPY tsconfig.json ./

ENV PORT=8080
EXPOSE 8080

# Crée/maj le schéma puis build + start
CMD sh -c "npx prisma db push && npm run build && npm run start"
EOF
