# First stage
FROM node:18-alpine as builder
LABEL org.opencontainers.image.source="https://github.com/ptrk25/sudoku-frontend"
WORKDIR /app
COPY . .
RUN npm install && \
    npm run build && \
    mkdir build_app && \
    mv package.json next.config.js public .next node_modules build_app

# Second stage
FROM node:18-slim

ENV FRONTEND_PORT=3000
ENV BACKEND_SERVER="sudoku-backend:3000"

EXPOSE $FRONTEND_PORT

WORKDIR /app

COPY --from=builder /app/build_app/ .

ENTRYPOINT ["npm", "start"]