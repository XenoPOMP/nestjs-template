FROM node:22-alpine AS base
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache openssl

FROM base AS deps
COPY package.json yarn.lock ./
RUN NODE_ENV=development yarn install --frozen-lockfile

FROM deps AS proddeps
RUN rm -rf node_modules
RUN yarn install --frozen-lockfile \
    --production --ignore-scripts \
    --prefer-offline --offline
COPY .dev/docker-scripts/clean-dev-deps .dev/docker-scripts/obfuscate \
     /usr/local/bin/
RUN clean-dev-deps
RUN obfuscate ./node_modules

FROM deps AS builder
# Generate prisma client
COPY ./prisma/schema.prisma ./prisma/schema.prisma
COPY ./prisma/models ./prisma/models
RUN npx prisma generate --schema ./prisma
# Build sources
COPY src ./src/
COPY tsconfig* nest-cli.json ./
RUN yarn build
# Clead dist folder
COPY .dev/docker-scripts/clean-dist /usr/local/bin
RUN clean-dist

FROM base AS runner
COPY package.json prisma.config.ts ./
COPY prisma ./prisma
COPY --from=proddeps --chown=node:node /app/node_modules ./node_modules/
COPY --from=builder /app/dist ./dist/

USER node
EXPOSE 4242
CMD ["yarn", "start:migrate:prod"]