# syntax=docker/dockerfile:1

# ---- builder ----
FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json extra.js ./
COPY src ./src
# tsc -> dist, then extra.js copies src/views + src/public into dist
RUN npm run build

# ---- runtime ----
FROM node:20-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/dist ./dist
# uploads is a bind-mounted volume at runtime; create the mount point
RUN mkdir -p uploads
EXPOSE 4003
CMD ["node", "dist/server.js"]
