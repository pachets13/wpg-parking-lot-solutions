import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages repo name: wpg-parking-lot-solutions
// To use a custom domain later, change base back to '/'

export default defineConfig({
  plugins: [react()],
  base: '/wpg-parking-lot-solutions/',
})
