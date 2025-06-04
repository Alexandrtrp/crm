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

// Пример темы для styled-components
export const theme = {
  colors: {
    primary: "#2563eb", // Основной (Primary)	Синий
    primaryHover: "#1d4ed8", // Primary Hover	Более тёмный синий	
    background: "#f9fafb",// Фон (Background)	Светло-серый (нейтральный
    surface: "#ffffff", // Белый блок (Card)	Белый
    border: "#e5e7eb", // Границы/разделители	Светло-серый	
    text: "#111827", // Текст (основной)	Тёмно-серый
    textSecondary: "#6b7280", // Текст вторичный	Серый	
    success: "#10b981", // Успех (Success)	Зелёный	
    error: "#ef4444", // Ошибка (Error)	Красный	
    warning: "#f97316", // Предупреждение	Оранжевый
    info: "#0ea5e9", // Информация	Голубой
  }
};

