// frontend/e2e/tests/smoke.spec.js
import { test, expect } from '@playwright/test';

test.describe('Home smoke (local)', () => {
  test('home loads → heading exists → shows at least 1 product card → CTA works', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('[data-testid="home-heading"]')).toBeVisible();

    const loader = page.locator('[data-testid="home-loader"]');
    if (await loader.count()) {
      await expect(loader).toHaveCount(0, { timeout: 10_000 });
    }

    await expect(page.locator('[data-testid="home-error"]')).toHaveCount(0);

    const cards = page.locator('[data-testid="product-card"]');
    await expect(cards.first()).toBeVisible();

    const cta = page.locator('[data-testid="cta-view-all"]');
    if (await cta.count()) {
      await cta.click();
      await expect(page).toHaveURL(/\/products$/);
    } else {
      test.info().annotations.push({ type: 'note', description: 'CTA not shown (possibly no products).' });
    }
  });
});
