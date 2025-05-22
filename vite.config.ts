import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          icons: ['react-icons'],
          ui: ['@radix-ui/react-tabs', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          animation: ['framer-motion'],
          utils: ['clsx', 'class-variance-authority', 'tailwind-merge'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
