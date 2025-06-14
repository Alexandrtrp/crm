import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const WAREHOUSE_NAMES = ['Китай', 'Домодедово', 'Мироновская'];
const EXCEL_FILE = './excels/components-count.xlsx'; // путь к Excel-файлу

async function main() {
  const workbook = XLSX.readFile(EXCEL_FILE);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  // 1. Создаём склады
  const warehouses = await Promise.all(
    WAREHOUSE_NAMES.map(async (name) => {
      return prisma.warehouse.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    })
  );

  // 2. Загружаем строки
  for (const row of data as any[]) {
    const name = row['name']?.trim();
    if (!name) continue;

    // 3. Создаём/ищем компонент
    const component = await prisma.component.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    // 4. Заполняем остатки по складам
    for (const warehouse of warehouses) {
      const count = Number(row[warehouse.name]) || 0;

      await prisma.componentStock.upsert({
        where: {
          componentId_warehouseId: {
            componentId: component.id,
            warehouseId: warehouse.id,
          },
        },
        update: { count },
        create: {
          componentId: component.id,
          warehouseId: warehouse.id,
          count,
        },
      });
    }
  }

  console.log('Импорт завершён!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
