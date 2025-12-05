/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'unknown',
ADD COLUMN     "createTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'unknown',
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT 'unknown',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'unknown',
ADD COLUMN     "surname" TEXT NOT NULL DEFAULT 'unknown';
