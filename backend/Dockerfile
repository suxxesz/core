# node:slim (Debian), а не alpine — у better-sqlite3 нативный аддон,
# и на alpine (musl) сборка/поиск prebuilt-бинарника чаще создаёт проблемы,
# чем на обычном glibc-образе.
FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

# Реальная команда запуска (server.js либо bot/start.js) задаётся полем
# `command:` в docker-compose.yml — один и тот же образ используется для
# обоих сервисов, чтобы не собирать/хранить его дважды.
CMD ["node", "server/server.js"]
