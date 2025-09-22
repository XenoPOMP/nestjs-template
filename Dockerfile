# Stage 1: Build the application
FROM node:22-alpine AS build
RUN apk add --no-cache openssl
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY prisma ./prisma
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Run the application
FROM node:22-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json /usr/src/app/yarn.lock ./
COPY --from=build /usr/src/app/prisma ./prisma
EXPOSE 4242
CMD ["yarn", "start:migrate:prod"]