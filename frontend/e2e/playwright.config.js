// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { 
    timeout: 10_000 
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'], 
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  
  use: {
    // תיקון: הגדרת baseURL ישירות
    baseURL: 'http://localhost:5173',
    
    // אסטרטגיית המתנה
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    
    // Tracing & debugging
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // הגדרות נוספות
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 }
  },
  
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // אפשר להגדיר baseURL ספציפי לפרויקט אם צריך
        // baseURL: process.env.E2E_BASE_URL || 'http://localhost:5173',
      }
    }
  ],
  
  // שרתי פיתוח (אופציונלי)
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
    timeout: 120_000
  }
});