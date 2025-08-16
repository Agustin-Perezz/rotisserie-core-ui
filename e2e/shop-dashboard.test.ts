import { expect, test } from '@playwright/test';
import { mockItems } from './mocks/items';

test('Shop dashboard page', async ({ page }) => {
  await page.route('**/items?shopId=123', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockItems)
    });
  });

  await page.goto('/shop/123/dashboard');
  await expect(page.getByTestId('shop-table')).toBeVisible();
});
