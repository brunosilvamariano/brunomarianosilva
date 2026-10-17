import { defineConfig } from 'vite';

// Servidor Vite local, sem conflito com o servidor estático anterior.
export default defineConfig({
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: { outDir: 'dist', assetsDir: 'assets', emptyOutDir: true },
});
