import { defineConfig } from '@playwright/test';
import { configDotenv } from 'dotenv';

configDotenv();

export default defineConfig({
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
    env: {
      VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY ?? '',
      VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
      VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID ?? '',
      VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID ?? ''
    }
  },
  testDir: 'e2e'
});
