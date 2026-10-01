import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// A page that shows every component in both themes. `pnpm preview` to look at it.
export default defineConfig({
  root: 'preview',
  base: './',
  plugins: [react(), tailwindcss()],
  build: { outDir: '../dist-preview', emptyOutDir: true },
});
