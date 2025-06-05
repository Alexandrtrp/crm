// 📁 mock/data.ts
export const mockArticles: Article[] = [
  {
    id: 1,
    name: "Артикул A001",
    image: "/images/a001.png",
    composition: "Хлопок 80%, Полиэстер 20%",
    price: 350,
    count: 300,
  },
  {
    id: 2,
    name: "Артикул A002",
    image: "/images/a002.png",
    composition: "Хлопок 100%",
    price: 420,
    count: 200,
  },
];

export const mockStats = [
  { name: "Артикул A001", done: 124 },
  { name: "Артикул A002", done: 89 },
];

export const warehouseStatus = [
  { article: "Артикул A001", quantity: 4, note: "минимум!" },
  { article: "Артикул B205", quantity: 10 },
  { article: "Артикул C303", quantity: 15 },
];

export const incomingShipments = [
  { id: "123", supplier: "Поставщик А", date: "завтра" },
  { id: "124", supplier: "Поставщик Б", date: "08.06" },
];

export const outgoingShipments = [
  { id: "501", date: "сегодня, 15:00" },
  { id: "502", date: "завтра, 09:00" },
];

export const myTasks = [
  "Проверить приход товара по накладной №124",
  "Отсканировать коробки с заказом №501",
];

export const kpi = [
  { label: "Выполнено задач", value: "12 / 15" },
  { label: "Остатки обработаны", value: "87%" },
  { label: "Сроки соблюдены", value: "95%" },
];

export const notifications = [
  "❗ Артикул A001 ниже минимума",
  "⚠ Поставка №124 задерживается",
  "📦 Проверка сроков хранения склада",
];
