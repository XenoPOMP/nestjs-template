FROM node:22-alpine AS base
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache openssl
COPY ./.dev/scripts/ ./dev/

FROM base AS deps
COPY package.json yarn.lock ./
RUN NODE_ENV=development yarn install --frozen-lockfile

FROM deps AS proddeps
RUN rm -rf node_modules
RUN yarn install --frozen-lockfile --prod --offline
RUN ./dev/clean-dev-deps.sh

FROM deps AS builder
COPY src ./src/
COPY prisma ./prisma/
COPY tsconfig* nest-cli.json ./
RUN npx prisma generate
RUN yarn build
RUN rm -rf ./dist/prisma ./dist/scripts ./dist/src

FROM base AS runner
COPY package.json ./
COPY --from=proddeps    /app/node_modules   ./node_modules/
COPY --from=builder     /app/dist ./dist/
EXPOSE 4242
CMD ["tail", "-f", "/dev/null"]