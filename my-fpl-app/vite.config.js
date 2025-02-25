import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Ensure the build output is in the 'build' directory
  },
  base: '/', // Base path for routing
  server: {
    port: 5173, // Optional: Set the development server port
  },
  // Handle SPA routing
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
