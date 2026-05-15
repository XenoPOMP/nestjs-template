FROM node:22-alpine AS base
ENV NODE_ENV=production
RUN apk add --no-cache openssl

FROM base AS builder
COPY package.json yarn.lock* ./
COPY prisma ./prisma
RUN NODE_ENV=development yarn install --frozen-lockfile