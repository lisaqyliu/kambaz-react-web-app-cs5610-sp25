/// <reference types="node" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_REMOTE_SERVER ?? 'https://kambaz-node-server-app-v5v2.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
