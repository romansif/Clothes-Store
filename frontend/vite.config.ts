import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";
import VueRouter from "unplugin-vue-router/vite";
import { fileURLToPath, URL } from "node:url";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
      VueRouter({
          routesFolder: 'src/pages',
      }),
      vue(),
      tailwindcss()
  ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@/app': fileURLToPath(new URL('./src/app', import.meta.url)),
            '@/feature': fileURLToPath(new URL('./src/feature', import.meta.url)),
            '@/pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@/shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
        headers: {
            'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
        },
    },
})
