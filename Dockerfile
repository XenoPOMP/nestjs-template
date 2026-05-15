# Setup base image
FROM node:22-alpine AS base
ENV NODE_ENV=production
RUN apk add --no-cache openssl

# Install dev deps
FROM base AS devdeps
WORKDIR /app/devDeps
COPY package.json yarn.lock* ./
COPY prisma ./prisma
RUN NODE_ENV=development yarn install --frozen-lockfile

# Install production deps
FROM base AS deps
WORKDIR /app/deps
COPY package.json yarn.lock* ./
COPY prisma ./prisma
RUN yarn install --frozen-lockfile
COPY .dev/sh/obfuscate.sh .
RUN ./obfuscate.sh ./node_modules

# Rebuild app only when needed
FROM base AS builder
WORKDIR /app/build
COPY --from=devdeps /app/devDeps/node_modules ./node_modules
COPY . .
RUN yarn run build
COPY ./.dev/sh ./scripts
RUN ./scripts/obfuscate.sh ./dist

# Run the actual app
FROM base AS runtime
WORKDIR /app/runtime
COPY package.json yarn.lock* ./
COPY prisma ./prisma
COPY --from=deps /app/deps/node_modules ./node_modules
COPY --from=builder /app/build/dist ./dist
EXPOSE 4242
CMD ["yarn", "start:migrate:prod"]
