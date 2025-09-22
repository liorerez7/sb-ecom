// e2e/tests/debug.spec.js
import { test, expect } from '@playwright/test';

test.describe('Debug Configuration', () => {
  test('check baseURL and navigation', async ({ page, baseURL, context }) => {
    console.log('=== Configuration Debug ===');
    console.log('baseURL from test context:', baseURL);
    console.log('process.env.E2E_BASE_URL:', process.env.E2E_BASE_URL);
    console.log('Browser context baseURL:', await context.storageState());
    
    // נסיון 1: URL מלא
    console.log('\nAttempt 1: Full URL');
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded');
    console.log('Current URL after full navigation:', page.url());
    
    // בדיקה בסיסית
    const title = await page.title();
    console.log('Page title:', title);
    
    // חיפוש אלמנט
    const heading = page.locator('[data-testid="home-heading"]');
    const headingExists = await heading.count() > 0;
    console.log('Heading exists:', headingExists);
    
    if (headingExists) {
      const headingText = await heading.textContent();
      console.log('Heading text:', headingText);
    }
    
    // נסיון 2: ניווט יחסי (אם baseURL מוגדר)
    if (baseURL) {
      console.log('\nAttempt 2: Relative URL with baseURL:', baseURL);
      await page.goto('/');
      console.log('Current URL after relative navigation:', page.url());
    } else {
      console.log('\nbaseURL is undefined - cannot use relative URLs');
    }
    
    // דיבוג נוסף
    console.log('\n=== Page Content Debug ===');
    const bodyText = await page.locator('body').textContent();
    console.log('Body contains "Top Rated":', bodyText.includes('Top Rated'));
    
    // רשימת כל ה-data-testid בעמוד
    const testIds = await page.locator('[data-testid]').evaluateAll(elements => 
      elements.map(el => el.getAttribute('data-testid'))
    );
    console.log('Available data-testids:', testIds);
  });
});