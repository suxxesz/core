# ---- сборка ----
FROM node:20-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Пустые значения = относительные пути (/api/message, /applications) —
# Caddy отдаёт и статику, и API с одного origin, поэтому в проде
# отдельный VITE_*_API_URL не нужен и CORS не участвует вовсе.
ARG VITE_MAIN_API_URL=
ARG VITE_BOT_API_URL=
ENV VITE_MAIN_API_URL=$VITE_MAIN_API_URL
ENV VITE_BOT_API_URL=$VITE_BOT_API_URL
RUN npm run build

# ---- раздача ----
FROM caddy:2-alpine
COPY --from=build /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile