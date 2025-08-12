import { expect, test } from '@playwright/test';

test('Shop dashboard page', async ({ page }) => {
  await page.goto('/shop/123/dashboard');
  await expect(page.getByTestId('shop-table')).toBeVisible();
});
