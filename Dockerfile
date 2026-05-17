FROM node:22-alpine AS base
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache openssl

FROM base AS deps
COPY package.json yarn.lock ./
RUN NODE_ENV=development yarn install --frozen-lockfile

FROM deps AS proddeps
RUN rm -rf node_modules
RUN yarn install --frozen-lockfile --prod --offline
COPY .dev/docker-scripts/. /usr/local/bin
RUN clean-dev-deps
RUN obfuscate ./node_modules

FROM deps AS builder
COPY src ./src/
COPY ./prisma/schema.prisma ./prisma/schema.prisma
COPY tsconfig* nest-cli.json ./
RUN npx prisma generate
RUN yarn build
COPY .dev/docker-scripts/. /usr/local/bin
RUN clean-dist

FROM base AS runner
COPY                    package.json prisma.config.ts   ./
COPY                    prisma                          ./prisma
COPY --from=proddeps    /app/node_modules               ./node_modules/
COPY --from=builder     /app/dist                       ./dist/
EXPOSE 4242
CMD ["yarn", "start:migrate:prod"]