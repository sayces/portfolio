import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // если это правильный плагин, ок
import path from "path";
import tsconfigPaths from 'vite-tsconfig-paths'; // ← добавь импорт

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()], // ← добавь в plugins
  base: "/portfolio/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});