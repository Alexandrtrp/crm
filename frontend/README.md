# React + TypeScript + Vite

├── /src
│   ├── /assets              # Стили, изображения, шрифты
│   ├── /components          # Переиспользуемые UI компоненты
│   ├── /features            # Фичи приложения (например, auth, profile)
│   ├── /layouts             # Основные макеты страниц (например,DashboardLayout)
│   ├── /pages               # Страницы приложения (например, HomePage, LoginPage)
│   ├── /routes              # Конфигурация маршрутов
│   ├── /services            # API-клиенты, запросы на сервер
│   ├── /store               # Redux/Zustand или Context
│   ├── /types               # Типы TypeScript

         // с этого пока не добавлял
│   ├── /utils               # Утилиты и хелперы
│   ├── /hooks               # Кастомные хуки
│   ├── /contexts            # React Context API (например, ThemeContext)
│   ├── /config              # Конфиги (например, axios, env)
│   └── main.tsx 

├── layouts/
│   └── DashboardLayout.tsx ← лэйаут для авторизованных страниц
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── HomePage.tsx
│   ├── ProfilePage.tsx
│   ├── TasksPage.tsx
│   ├── KpiPage.tsx
│   ├── SkladPage.tsx
│   └── NotFoundPage.tsx