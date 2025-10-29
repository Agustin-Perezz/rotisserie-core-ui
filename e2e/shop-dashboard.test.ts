import { expect, test } from '@playwright/test';
import { mockItems } from './mocks/items';

test('Shop dashboard page', async ({ page }) => {
  const mockShop = {
    id: '123',
    name: 'Test Shop',
    description: 'Test shop description',
    items: mockItems,
    ownerId: 'owner123',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  };

  await page.route('**/shops/123', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockShop)
    });
  });

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
