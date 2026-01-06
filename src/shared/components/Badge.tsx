import React from "react";

interface BadgeProps {
  tech: string;
}

const techConfig: Record<string, { color: string; url?: string }> = {
  JavaScript: {
    color: "bg-orange-200 text-orange-800",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  TypeScript: {
    color: "bg-blue-200 text-blue-800",
    url: "https://www.typescriptlang.org/",
  },
  React: { color: "bg-cyan-200 text-cyan-800", url: "https://react.dev/" },
  "Next.js": { color: "bg-gray-800 text-white", url: "https://nextjs.org/" },
  "Tailwind CSS": {
    color: "bg-sky-400 text-teal-100",
    url: "https://tailwindcss.com/",
  },
  "REST API": { color: "bg-indigo-200 text-indigo-800" },
  Leaflet: {
    color: "bg-green-200 text-green-800",
    url: "https://leafletjs.com/",
  },
  "React Hook Form": {
    color: "bg-pink-200 text-pink-800",
    url: "https://react-hook-form.com/",
  },
  "RTK Query": {
    color: "bg-red-200 text-red-800",
    url: "https://redux-toolkit.js.org/rtk-query/overview",
  },
  Redux: {
    color: "bg-purple-200 text-purple-800",
    url: "https://redux.js.org/",
  },
  Assembly: { color: "bg-yellow-200 text-yellow-800" },
  "Docker Compose": {
    color: "bg-blue-300 text-blue-900",
    url: "https://docs.docker.com/compose/",
  },
  Dockerfile: {
    color: "bg-blue-300 text-blue-900",
    url: "https://docs.docker.com/reference/dockerfile/",
  },
  "Computer Architecture": { color: "bg-gray-300 text-gray-900" },
  HTML: {
    color: "bg-red-200 text-red-800",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  DOM: { color: "bg-orange-300 text-orange-900" },
  SCSS: { color: "bg-pink-300 text-pink-900", url: "https://sass-lang.com/" },
  BEM: { color: "bg-green-300 text-green-900", url: "https://en.bem.info/" },
  Figma: {
    color: "bg-purple-300 text-purple-900",
    url: "https://www.figma.com/",
  },
  Python: {
    color: "bg-yellow-300 text-yellow-900",
    url: "https://www.python.org/",
  },
  CSS: {
    color: "bg-blue-200 text-blue-800",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  SQL: { color: "bg-indigo-300 text-indigo-900" },
  MySQL: {
    color: "bg-orange-400 text-orange-900",
    url: "https://www.mysql.com/",
  },
  GridCSS: {
    color: "bg-teal-300 text-teal-900",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
  },
  Flexbox: {
    color: "bg-teal-300 text-teal-900",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout",
  },
  Algorithms: { color: "bg-gray-400 text-gray-900" },
};

const defaultBadgeClass = "bg-gray-200 text-gray-700";

const Badge: React.FC<BadgeProps> = ({ tech }) => {
  const config = techConfig[tech] || { color: defaultBadgeClass };
  const baseClass = `${config.color} text-sm px-3 py-1 rounded-full hover:opacity-80 transition-opacity`;

  if (config.url) {
    return (
      <a
        href={config.url}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        {tech}
      </a>
    );
  }

  return <span className={baseClass}>{tech}</span>;
};

export default Badge;
