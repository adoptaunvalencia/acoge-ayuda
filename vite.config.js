import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { host: true },
  resolve: {
    alias: {
      pages: "/src/pages",
      components: "/src/components",
      contexts: "/src/contexts",
      hooks: "/src/hooks",
      styles: "/src/styles",
    },
  },
})
