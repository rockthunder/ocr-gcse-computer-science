import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built app works from any path (e.g. GitHub Pages or opened locally via a static server).
export default defineConfig({
  plugins: [react()],
  base: './',
});
