import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages repo name: wpgParkingLotSolutions-Website
// To use a custom domain later, change base back to '/'

export default defineConfig({
  plugins: [react()],
  base: '/wpgParkingLotSolutions-Website/',
})
