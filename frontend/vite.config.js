/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    root: './src/',
    setupFiles: ['./src/tests/testSetup.js'],
    // 各テスト前にMockをクリア
    clearMocks: true,
  },
})
