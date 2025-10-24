import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const EXCEL_FILE = './excels/articles-count.xlsx'; 

async function main() {
  const workbook = XLSX.readFile(EXCEL_FILE);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json<{ name: string; [key: string]: any }>(sheet);


  const warehouseNames = Object.keys(data[0]).filter((key) => key !== 'name');

  const warehousesMap: Record<string, { id: string }> = {};
  for (const name of warehouseNames) {
    const warehouse = await prisma.warehouse.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    warehousesMap[name] = warehouse;
  }

  for (const row of data as any[]) {
    const name = row['name']?.trim();
    if (!name) continue;

    const article = await prisma.article.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    for (const warehouseName of warehouseNames) {
      const count = Number(row[warehouseName]) || 0;
      const warehouse = warehousesMap[warehouseName];

      await prisma.articleStock.upsert({
        where: {
          articleId_warehouseId: {
            articleId: article.id,
            warehouseId: warehouse.id,
          },
        },
        update: { count },
        create: {
          articleId: article.id,
          warehouseId: warehouse.id,
          count,
        },
      });
    }
  }

  console.log('✅ Импорт завершён!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
