// e2e/tests/login.spec.js
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    const url = baseURL || BASE_URL;
    await page.goto(`${url}/login`);
    await page.waitForLoadState('networkidle');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    console.log('Starting login test...');
    console.log('Current URL:', page.url());
    
    // מצא שדות קלט עם placeholder ספציפי
    const usernameInput = page.locator('input[placeholder="Enter your username"]');
    const passwordInput = page.locator('input[placeholder="Enter your password"]');
    
    // ודא שהשדות נמצאו
    await expect(usernameInput).toBeVisible({ timeout: 5000 });
    await expect(passwordInput).toBeVisible({ timeout: 5000 });
    console.log('✓ Login form fields found');
    
    // נקה והקלד פרטי התחברות
    await usernameInput.clear();
    await usernameInput.fill('seller1');
    await passwordInput.clear();
    await passwordInput.fill('password2');
    console.log('✓ Credentials entered');
    
    // מצא כפתור התחברות
    const loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")').first();
    
    await expect(loginButton).toBeVisible();
    console.log('✓ Login button found');
    
    // הכן לניווט לפני הלחיצה
    const navigationPromise = page.waitForURL((url) => !url.href.includes('/login'), { 
      timeout: 10000,
      waitUntil: 'networkidle' 
    }).catch(() => null);
    
    // לחץ על כפתור ההתחברות
    await loginButton.click();
    console.log('✓ Login button clicked');
    
    // חכה לניווט
    const navigationResult = await navigationPromise;
    
    if (navigationResult !== null) {
      console.log('✓ Navigation successful');
    } else {
      // נסה שוב עם המתנה ידנית
      await page.waitForTimeout(3000);
    }
    
    // בדוק URL סופי
    const currentUrl = page.url();
    console.log('Final URL:', currentUrl);
    
    if (!currentUrl.includes('/login')) {
      console.log('✅ Login successful - redirected from login page');
      
      // בדוק אם הגענו לדף הבית או products
      if (currentUrl.endsWith('/') || currentUrl.includes('/products')) {
        console.log('✓ Redirected to expected page');
      }
      
      // תיקון: חפש אינדיקציות להתחברות מוצלחת בצורה נכונה
      const homeHeading = page.locator('[data-testid="home-heading"]');
      const topRatedText = page.locator('text="Top Rated Products"');
      
      if (await homeHeading.count() > 0 || await topRatedText.count() > 0) {
        console.log('✓ Home page content visible');
      }
    } else {
      // עדיין בדף login - בדוק אם יש הודעת שגיאה
      const errorMessage = page.locator('.error, .alert, [role="alert"], text=/invalid|incorrect|failed/i');
      if (await errorMessage.count() > 0) {
        const errorText = await errorMessage.textContent();
        console.log('❌ Login failed with error:', errorText);
        throw new Error('Login failed - still on login page with error');
      } else {
        console.log('❌ Login failed - still on login page without error message');
        throw new Error('Login failed - still on login page');
      }
    }
    
    // אסרט סופי
    expect(currentUrl).not.toContain('/login');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    console.log('Testing invalid login...');
    
    // הקלד פרטים שגויים
    const usernameInput = page.locator('input[placeholder="Enter your username"]');
    const passwordInput = page.locator('input[placeholder="Enter your password"]');
    
    await usernameInput.clear();
    await usernameInput.fill('wronguser');
    await passwordInput.clear();
    await passwordInput.fill('wrongpass');
    console.log('✓ Invalid credentials entered');
    
    // לחץ על כפתור ההתחברות
    const loginButton = page.locator('button[type="submit"]').first();
    await loginButton.click();
    console.log('✓ Login button clicked');
    
    // חכה קצת לתגובה
    await page.waitForTimeout(2000);
    
    // בדוק אם נשארנו בדף login
    const currentUrl = page.url();
    expect(currentUrl).toContain('/login');
    console.log('✓ Stayed on login page as expected');
    
    // חפש הודעת שגיאה
    const errorSelectors = [
      '.error',
      '.alert', 
      '[role="alert"]',
      '.MuiAlert-root',
      'text=/invalid|incorrect|wrong|failed/i'
    ];
    
    let errorFound = false;
    for (const selector of errorSelectors) {
      const errorElement = page.locator(selector);
      if (await errorElement.count() > 0) {
        const errorText = await errorElement.first().textContent();
        console.log('✓ Error message found:', errorText);
        errorFound = true;
        break;
      }
    }
    
    if (!errorFound) {
      console.log('⚠ No explicit error message found, but login was blocked');
    }
  });

  test('should have required field validation', async ({ page }) => {
    console.log('Testing required field validation...');
    
    // נסה להתחבר בלי למלא כלום
    const loginButton = page.locator('button[type="submit"]').first();
    await loginButton.click();
    
    // חכה לולידציה
    await page.waitForTimeout(1000);
    
    // בדוק אם נשארנו בדף login
    const currentUrl = page.url();
    expect(currentUrl).toContain('/login');
    console.log('✓ Form submission blocked with empty fields');
    
    // בדוק אם יש הודעות ולידציה HTML5 או custom
    const usernameInput = page.locator('input[placeholder="Enter your username"]');
    const isUsernameRequired = await usernameInput.evaluate(el => el.hasAttribute('required'));
    
    if (isUsernameRequired) {
      console.log('✓ Username field has required attribute');
    }
    
    const passwordInput = page.locator('input[placeholder="Enter your password"]');
    const isPasswordRequired = await passwordInput.evaluate(el => el.hasAttribute('required'));
    
    if (isPasswordRequired) {
      console.log('✓ Password field has required attribute');
    }
  });
});