FROM node:22-alpine AS base
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache openssl

FROM base AS deps
COPY package.json yarn.lock ./
RUN NODE_ENV=development yarn install --frozen-lockfile

FROM base AS runner
COPY --from=deps /app/node_modules ./node_modules
CMD ["tail", "-f", "/dev/null"]