import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  console.log("Migrating Users...");
  const users = await prisma.user.findMany();
  const userMap: Record<number, string> = {}; // старый Int -> новый UUID
  for (const u of users) {
    const newId = uuidv4();
    userMap[u.id] = newId;
    await prisma.user.update({
      where: { id: u.id },
      data: { id: newId } as any,
    });
  }

  console.log("Migrating Tasks...");
  const tasks = await prisma.task.findMany();
  for (const t of tasks) {
    await prisma.task.update({
      where: { id: t.id },
      data: {
        id: uuidv4(),
        assigneeId: userMap[t.assigneeId],
      } as any,
    });
  }

  console.log("Migrating Components...");
  const components = await prisma.component.findMany();
  const componentMap: Record<number, string> = {};
  for (const c of components) {
    const newId = uuidv4();
    componentMap[c.id] = newId;
    await prisma.component.update({
      where: { id: c.id },
      data: { id: newId } as any,
    });
  }

  console.log("Migrating Articles...");
  const articles = await prisma.article.findMany();
  const articleMap: Record<number, string> = {};
  for (const a of articles) {
    const newId = uuidv4();
    articleMap[a.id] = newId;
    await prisma.article.update({
      where: { id: a.id },
      data: { id: newId } as any,
    });
  }

  console.log("Migrating ArticleComponents...");
  const articleComponents = await prisma.articleComponent.findMany();
  for (const ac of articleComponents) {
    await prisma.articleComponent.update({
      where: { id: ac.id },
      data: {
        id: uuidv4(),
        articleId: articleMap[ac.articleId],
        componentId: componentMap[ac.componentId],
      } as any,
    });
  }

  console.log("Migrating Warehouses...");
  const warehouses = await prisma.warehouse.findMany();
  const warehouseMap: Record<number, string> = {};
  for (const w of warehouses) {
    const newId = uuidv4();
    warehouseMap[w.id] = newId;
    await prisma.warehouse.update({
      where: { id: w.id },
      data: { id: newId } as any,
    });
  }

  console.log("Migrating ComponentStock...");
  const componentStocks = await prisma.componentStock.findMany();
  for (const cs of componentStocks) {
    await prisma.componentStock.update({
      where: { id: cs.id },
      data: {
        id: uuidv4(),
        componentId: componentMap[cs.componentId],
        warehouseId: warehouseMap[cs.warehouseId],
      } as any,
    });
  }

  console.log("Migrating ArticleStock...");
  const articleStocks = await prisma.articleStock.findMany();
  for (const as of articleStocks) {
    await prisma.articleStock.update({
      where: { id: as.id },
      data: {
        id: uuidv4(),
        articleId: articleMap[as.articleId],
        warehouseId: warehouseMap[as.warehouseId],
      } as any,
    });
  }

  console.log("Migration completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
