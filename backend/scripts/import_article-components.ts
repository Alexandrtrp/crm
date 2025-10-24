import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();
const EXCEL_FILE = './excels/articleComponentsLink.xlsx';

async function main() {
  const workbook = XLSX.readFile(EXCEL_FILE);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet) as Record<string, any>[];

  console.log(`📄 Найдено ${rows.length} строк`);

  for (const row of rows) {
    const articleName = String(row['article_name']).trim();
    const componentName = String(row['component_name']).trim();
    const quantity = Number(row['component_quantity']) || 0;

    if (!articleName || !componentName) {
      console.warn(
        '⚠️ Пропущена строка без названия артикулы или компонента:',
        row,
      );
      continue;
    }

    let article = await prisma.article.findUnique({
      where: { name: articleName },
    });

    if (!article) {
      article = await prisma.article.create({
        data: { name: articleName },
      });
      console.log(`🆕 Создан артикул: ${articleName}`);
    }

    let component = await prisma.component.findUnique({
      where: { name: componentName },
    });

    if (!component) {
      component = await prisma.component.create({
        data: { name: componentName },
      });
      console.log(`🆕 Создан компонент: ${componentName}`);
    }

    const existingLink = await prisma.articleComponent.findUnique({
      where: {
        articleId_componentId: {
          articleId: article.id,
          componentId: component.id,
        },
      },
    });

    if (!existingLink) {
      await prisma.articleComponent.create({
        data: {
          articleId: article.id,
          componentId: component.id,
          quantity,
        },
      });
      console.log(
        `🔗 Связан "${articleName}" ↔ "${componentName}" (x${quantity})`,
      );
    } else {
      console.log(
        `✅ Связь уже существует: ${articleName} ↔ ${componentName}`,
      );
    }
  }

  console.log('✅ Импорт завершён');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка импорта:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
