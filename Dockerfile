FROM node:22-alpine AS base
ENV NODE_ENV=production
RUN apk add --no-cache openssl
