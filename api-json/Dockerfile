FROM node:20-alpine
WORKDIR /api
# version figée et stable
RUN npm i -g json-server@0.17.4
EXPOSE 8080
CMD ["json-server","--host","0.0.0.0","--port","8080","/data/db.json"]
