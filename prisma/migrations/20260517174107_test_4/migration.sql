/*
  Warnings:

  - You are about to drop the `users3` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users3";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");
