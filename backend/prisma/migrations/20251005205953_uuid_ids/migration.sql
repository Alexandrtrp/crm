/*
  Warnings:

  - The primary key for the `Article` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ArticleComponent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ArticleStock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Component` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ComponentStock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Warehouse` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ArticleComponent" DROP CONSTRAINT "ArticleComponent_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleComponent" DROP CONSTRAINT "ArticleComponent_componentId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleStock" DROP CONSTRAINT "ArticleStock_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleStock" DROP CONSTRAINT "ArticleStock_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "ComponentStock" DROP CONSTRAINT "ComponentStock_componentId_fkey";

-- DropForeignKey
ALTER TABLE "ComponentStock" DROP CONSTRAINT "ComponentStock_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assigneeId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP CONSTRAINT "Article_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Article_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Article_id_seq";

-- AlterTable
ALTER TABLE "ArticleComponent" DROP CONSTRAINT "ArticleComponent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "articleId" SET DATA TYPE TEXT,
ALTER COLUMN "componentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ArticleComponent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ArticleComponent_id_seq";

-- AlterTable
ALTER TABLE "ArticleStock" DROP CONSTRAINT "ArticleStock_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "articleId" SET DATA TYPE TEXT,
ALTER COLUMN "warehouseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ArticleStock_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ArticleStock_id_seq";

-- AlterTable
ALTER TABLE "Component" DROP CONSTRAINT "Component_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Component_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Component_id_seq";

-- AlterTable
ALTER TABLE "ComponentStock" DROP CONSTRAINT "ComponentStock_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "componentId" SET DATA TYPE TEXT,
ALTER COLUMN "warehouseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ComponentStock_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ComponentStock_id_seq";

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "assigneeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Task_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Warehouse" DROP CONSTRAINT "Warehouse_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Warehouse_id_seq";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleComponent" ADD CONSTRAINT "ArticleComponent_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleComponent" ADD CONSTRAINT "ArticleComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponentStock" ADD CONSTRAINT "ComponentStock_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponentStock" ADD CONSTRAINT "ComponentStock_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleStock" ADD CONSTRAINT "ArticleStock_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleStock" ADD CONSTRAINT "ArticleStock_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
