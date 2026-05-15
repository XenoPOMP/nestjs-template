# Setup base image
FROM node:22-alpine AS base
ENV NODE_ENV=production
RUN apk add --no-cache openssl

# Install yarn deps
FROM base AS deps
WORKDIR /app/deps
COPY package.json yarn.lock* ./
COPY prisma ./prisma
RUN yarn install --frozen-lockfile

# Rebuild app only when needed
FROM base AS builder
WORKDIR /app/build
COPY --from=deps /app/deps/node_modules ./node_modules
COPY . .
RUN yarn run build

# Run the actual app
FROM base AS runtime
WORKDIR /app/runtime
COPY package.json yarn.lock* ./
COPY prisma ./prisma
COPY --from=deps /app/deps/node_modules ./node_modules
COPY --from=builder /app/build/dist ./dist
RUN \
    npx --yes concurrently \
      'npx --yes @slsplus/node-prune'
EXPOSE 4242
CMD ["yarn", "start:migrate:prod"]
