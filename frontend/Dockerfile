FROM node:lts-alpine
WORKDIR /app


COPY *.json .
RUN npm i
COPY codegen.ts .
COPY index.html .
COPY vite.config.ts .
COPY src src
COPY public public 



CMD npm run dev