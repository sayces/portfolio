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
    description: "Dynamic programming language for the web",
    borderColor: "border-orange-700",
  },
  TypeScript: {
    color: "bg-blue-200 text-blue-800",
    url: "https://www.typescriptlang.org/",
    description: "Statically typed superset of JavaScript",
    borderColor: "border-blue-700",
  },
  React: {
    color: "bg-cyan-200 text-cyan-800",
    url: "https://react.dev/",
    description: "Library for building user interfaces",
    borderColor: "border-cyan-700",
  },
  "Next.js": {
    color: "bg-gray-800 text-white",
    url: "https://nextjs.org/",
    description: "React framework with SSR and SSG",
    borderColor: "border-gray-600",
  },
  "Tailwind CSS": {
    color: "bg-sky-400 text-teal-100",
    url: "https://tailwindcss.com/",
    description: "Utility-first CSS framework",
    borderColor: "border-sky-600",
  },
  "REST API": {
    color: "bg-indigo-200 text-indigo-800",
    description: "Architectural style for web services",
    borderColor: "border-indigo-700",
  },
  Leaflet: {
    color: "bg-green-200 text-green-800",
    url: "https://leafletjs.com/",
    description: "Library for interactive maps",
    borderColor: "border-green-700",
  },
  "React Hook Form": {
    color: "bg-pink-200 text-pink-800",
    url: "https://react-hook-form.com/",
    description: "Performant forms in React",
    borderColor: "border-pink-700",
  },
  "RTK Query": {
    color: "bg-red-200 text-red-800",
    url: "https://redux-toolkit.js.org/rtk-query/overview",
    description: "Powerful data caching tool for Redux",
    borderColor: "border-red-700",
  },
  Redux: {
    color: "bg-purple-200 text-purple-800",
    url: "https://redux.js.org/",
    description: "State management library",
    borderColor: "border-purple-700",
  },
  Assembly: { color: "bg-yellow-200 text-yellow-800" },
  "Docker Compose": {
    color: "bg-blue-300 text-blue-900",
    url: "https://docs.docker.com/compose/",
    description: "Multi-container orchestration",
    borderColor: "border-blue-800",
  },
  Dockerfile: {
    color: "bg-blue-300 text-blue-900",
    url: "https://docs.docker.com/reference/dockerfile/",
    description: "File for building Docker images",
    borderColor: "border-blue-800",
  },
  "Computer Architecture": { color: "bg-gray-300 text-gray-900" },
  HTML: {
    color: "bg-red-200 text-red-800",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    description: "Hypertext markup language",
    borderColor: "border-red-700",
  },
  DOM: { color: "bg-orange-300 text-orange-900" },
  SCSS: {
    color: "bg-pink-300 text-pink-900",
    url: "https://sass-lang.com/",
    description: "CSS preprocessor with variables and mixins",
    borderColor: "border-pink-800",
  },
  BEM: {
    color: "bg-green-300 text-green-900",
    url: "https://en.bem.info/",
    description: "Class naming methodology",
    borderColor: "border-green-800",
  },
  Figma: {
    color: "bg-purple-300 text-purple-900",
    url: "https://www.figma.com/",
    description: "UI/UX design tool",
    borderColor: "border-purple-800",
  },
  Python: {
    color: "bg-yellow-300 text-yellow-900",
    url: "https://www.python.org/",
    description: "General-purpose programming language",
    borderColor: "border-yellow-800",
  },
  CSS: {
    color: "bg-blue-200 text-blue-800",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    description: "Styling language for the web",
    borderColor: "border-blue-700",
  },
  SQL: { color: "bg-indigo-300 text-indigo-900" },
  MySQL: {
    color: "bg-orange-400 text-orange-900",
    url: "https://www.mysql.com/",
    description: "Popular relational database",
    borderColor: "border-orange-800",
  },
  GridCSS: {
    color: "bg-teal-300 text-teal-900",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
    description: "Powerful grid system in CSS",
    borderColor: "border-teal-800",
  },
  Flexbox: {
    color: "bg-teal-300 text-teal-900",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout",
    description: "Flexible layout system",
    borderColor: "border-teal-800",
  },
  Algorithms: { color: "bg-gray-400 text-gray-900" },
};

export const defaultBadgeClass = "bg-gray-200 text-gray-700";
export const defaultBorderClass = "border-gray-600";
