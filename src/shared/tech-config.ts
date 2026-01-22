export interface TechConfig {
  color: string;
  url?: string;
  description?: string;
  borderColor?: string;
}

export const techConfig: Record<string, TechConfig> = {
  JavaScript: {
    color: "bg-orange-200 text-orange-800",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    description: "Динамический язык программирования для веба",
    borderColor: "border-orange-700",
  },
  TypeScript: {
    color: "bg-blue-200 text-blue-800",
    url: "https://www.typescriptlang.org/",
    description: "Статически типизированный надмножество JavaScript",
    borderColor: "border-blue-700",
  },
  React: {
    color: "bg-cyan-200 text-cyan-800",
    url: "https://react.dev/",
    description: "Библиотека для создания пользовательских интерфейсов",
    borderColor: "border-cyan-700",
  },
  "Next.js": {
    color: "bg-gray-800 text-white",
    url: "https://nextjs.org/",
    description: "Фреймворк на базе React с SSR и SSG",
    borderColor: "border-gray-600",
  },
  "Tailwind CSS": {
    color: "bg-sky-400 text-teal-100",
    url: "https://tailwindcss.com/",
    description: "Утилитарный CSS-фреймворк",
    borderColor: "border-sky-600",
  },
  "REST API": {
    color: "bg-indigo-200 text-indigo-800",
    description: "Архитектурный стиль для веб-сервисов",
    borderColor: "border-indigo-700",
  },
  Leaflet: {
    color: "bg-green-200 text-green-800",
    url: "https://leafletjs.com/",
    description: "Библиотека для интерактивных карт",
    borderColor: "border-green-700",
  },
  "React Hook Form": {
    color: "bg-pink-200 text-pink-800",
    url: "https://react-hook-form.com/",
    description: "Удобная работа с формами в React",
    borderColor: "border-pink-700",
  },
  "RTK Query": {
    color: "bg-red-200 text-red-800",
    url: "https://redux-toolkit.js.org/rtk-query/overview",
    description: "Мощный инструмент кэширования данных для Redux",
    borderColor: "border-red-700",
  },
  Redux: {
    color: "bg-purple-200 text-purple-800",
    url: "https://redux.js.org/",
    description: "Библиотека для управления состоянием",
    borderColor: "border-purple-700",
  },
  Assembly: { color: "bg-yellow-200 text-yellow-800" },
  "Docker Compose": {
    color: "bg-blue-300 text-blue-900",
    url: "https://docs.docker.com/compose/",
    description: "Оркестрация нескольких контейнеров",
    borderColor: "border-blue-800",
  },
  Dockerfile: {
    color: "bg-blue-300 text-blue-900",
    url: "https://docs.docker.com/reference/dockerfile/",
    description: "Файл для сборки Docker-образа",
    borderColor: "border-blue-800",
  },
  "Computer Architecture": { color: "bg-gray-300 text-gray-900" },
  HTML: {
    color: "bg-red-200 text-red-800",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    description: "Язык разметки гипертекста",
    borderColor: "border-red-700",
  },
  DOM: { color: "bg-orange-300 text-orange-900" },
  SCSS: {
    color: "bg-pink-300 text-pink-900",
    url: "https://sass-lang.com/",
    description: "Препроцессор CSS с переменными и миксинами",
    borderColor: "border-pink-800",
  },
  BEM: {
    color: "bg-green-300 text-green-900",
    url: "https://en.bem.info/",
    description: "Методология именования классов",
    borderColor: "border-green-800",
  },
  Figma: {
    color: "bg-purple-300 text-purple-900",
    url: "https://www.figma.com/",
    description: "Инструмент для UI/UX дизайна",
    borderColor: "border-purple-800",
  },
  Python: {
    color: "bg-yellow-300 text-yellow-900",
    url: "https://www.python.org/",
    description: "Универсальный язык программирования",
    borderColor: "border-yellow-800",
  },
  CSS: {
    color: "bg-blue-200 text-blue-800",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    description: "Язык стилей для веба",
    borderColor: "border-blue-700",
  },
  SQL: { color: "bg-indigo-300 text-indigo-900" },
  MySQL: {
    color: "bg-orange-400 text-orange-900",
    url: "https://www.mysql.com/",
    description: "Популярная реляционная СУБД",
    borderColor: "border-orange-800",
  },
  GridCSS: {
    color: "bg-teal-300 text-teal-900",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
    description: "Мощная система сеток в CSS",
    borderColor: "border-teal-800",
  },
  Flexbox: {
    color: "bg-teal-300 text-teal-900",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout",
    description: "Гибкая система расположения элементов",
    borderColor: "border-teal-800",
  },
  Algorithms: { color: "bg-gray-400 text-gray-900" },
};

export const defaultBadgeClass = "bg-gray-200 text-gray-700";
export const defaultBorderClass = "border-gray-600";