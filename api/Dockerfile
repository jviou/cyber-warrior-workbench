FROM node:20-alpine
WORKDIR /api

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src
COPY tsconfig.json ./

ENV PORT=8080
EXPOSE 8080

# crée/maj le schéma puis build + start
CMD sh -c "npx prisma db push && npm run build && npm run start"
