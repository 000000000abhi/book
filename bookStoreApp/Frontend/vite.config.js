import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT) || 5173, // Default fallback
  }, optimizeDeps: {
    exclude: ["jsonwebtoken"]
  }
});
