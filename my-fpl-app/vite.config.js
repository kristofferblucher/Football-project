import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure the base path is set correctly
  server: {
    port: 5173, // Local development port
  },
  build: {
    outDir: 'dist', // Ensure the output directory is correctly set
  }
});
