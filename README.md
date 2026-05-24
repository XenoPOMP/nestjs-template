<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">
Nest.js Starter
</h1>

## 🫆 Preparing for local development
The initial database setup is needed. After setting up ``.env`` file, please, run these commands:
```shell
yarn migrate:dev --name init
```
This script will generate database and apply all the migrations for it, also it will generate local client.

## 🔨 Features
- 🐳 Docker-compose
- 🔎 Prisma ORM
- 🐶 Husky hooks for local development
- 🤖 GitHub Actions driven CI
- 🍪 Simple JWT Auth
- 🟢 OpenAPI specs (powered by ``@nestjs/swagger``)

## 🫗 Prisma
Folder structure looks like this:
```
./prisma
├── migrations
│   ├── ... your migrations
│   └── migration_lock.toml
├── models
│   └── user.prisma
│   └── ... your other models
└── schema.prisma
```
You should create models in separate files, located in ``./prisma/models`` folder.

## 🟢 OpenAPI

- Swagger UI: http://localhost:4242/openapi
- openapi.yaml: http://localhost:4242/openapi.yaml
- openapi.json: http://localhost:4242/openapi.json