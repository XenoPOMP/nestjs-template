# Stage 0: Fetch runtime
FROM node:22-alpine AS base

# Stage 1: Install deps
FROM base AS deps
RUN apk add --no-cache openssl
WORKDIR /usr/src/app
# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 2: Rebuild the source code only when needed
FROM base AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY prisma ./prisma
COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 3: Production image
FROM base AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/prisma ./prisma
# Copy any time of lockfile
COPY --from=builder /usr/src/app/yarn.lock* ./
COPY --from=builder /usr/src/app/package-lock.json* ./
COPY --from=builder /usr/src/app/pnpm-lock.yaml* ./
COPY --from=builder /usr/src/app/.npmrc* ./
EXPOSE 4242
CMD ["yarn", "start:migrate:prod"]