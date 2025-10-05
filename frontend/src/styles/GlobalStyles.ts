import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f9fafb;
    color: #111827;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
  }
`;

export const theme = {
  colors: {
    primary: '#2563eb', // Основной синий
    primaryHover: '#1d4ed8', // Наведение — более тёмный
    primaryActive: '#1e40af', // Активное состояние — ещё насыщеннее

    background: '#f9fafb', // Фон
    surface: '#ffffff', // Карточки / блоки
    border: '#e5e7eb', // Разделители

    text: '#111827', // Основной текст
    textSecondary: '#6b7280', // Вторичный текст

    success: '#10b981', // Успех (зелёный)
    error: '#ef4444', // Ошибка (красный)
    warning: '#f97316', // Предупреждение (оранжевый)
    info: '#0ea5e9', // Информация (голубой)

    disabled: '#d1d5db', // Серый фон для неактивных кнопок
    disabledText: '#9ca3af', // Серый текст для неактивных кнопок
  },
};
