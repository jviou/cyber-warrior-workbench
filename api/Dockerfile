FROM node:20-alpine
WORKDIR /api

# deps tools (si jamais)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src
COPY tsconfig.json ./

ENV PORT=8080
EXPOSE 8080

# migration auto au démarrage + start
CMD sh -c "npx prisma migrate deploy && npm run build && npm run start"
