/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.png'],
      manifest: {
        name: 'Calorie Work',
        short_name: 'Calorie Work',
        description: '消費したいカロリーを入力すると、文部科学省のデータに基づいて必要な運動時間を自動計算できるWebサービスです。',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
  test: {
    environment: 'happy-dom',
    root: './src/',
    setupFiles: ['./src/tests/testSetup.js'],
    // 各テスト前にMockをクリア
    clearMocks: true,
  },
})
