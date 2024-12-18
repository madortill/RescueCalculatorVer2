// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   base: process.env.NODE_ENV === "production" ? "/RescueCalculator/" : "/",
// })
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: process.env.NODE_ENV === "production" ? "/RescueCalculatorVer2/" : "/",
  build: {
    // Control how the filenames are generated
    rollupOptions: {
      output: {
        // Modify the entry file name
        entryFileNames: 'index.js',
        chunkFileNames: '[name].js',  // Custom naming for chunks
        assetFileNames: '[name].[ext]' // Custom naming for assets
      }
    }
  }
})
