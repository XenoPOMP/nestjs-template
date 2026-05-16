FROM node:22-alpine AS base
ENV NODE_ENV=production
RUN apk add --no-cache openssl

FROM base AS builder
WORKDIR /app/build
# Copy configurations
COPY package.json yarn.lock* tsconfig* nest-cli.json ./
COPY prisma ./prisma
RUN NODE_ENV=development yarn install --frozen-lockfile
# Build project only when needed
COPY src ./src
RUN yarn run build
# Delete development assets
RUN rm -rf node_modules src
RUN yarn install --frozen-lockfile --offline
# Obfuscate some folders
COPY .dev/sh ./scripts
RUN ./scripts/obfuscate.sh dist
RUN ./scripts/obfuscate.sh node_modules
RUN ./scripts/obfuscate.sh prisma/generated
RUN ./scripts/clean-dev-deps.sh

FROM base AS runner
WORKDIR /app/runner
COPY --from=builder /app/build ./
CMD ["yarn", "start:migrate:prod"]