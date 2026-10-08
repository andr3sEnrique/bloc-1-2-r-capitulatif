import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Le bundle contient toute la banque de questions (texte) : ~170 Ko gzippés, acceptable.
  build: { chunkSizeWarningLimit: 800 },
})
