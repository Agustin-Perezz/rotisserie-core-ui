import { test, expect } from './fixtures/auth';

test('New shop page', async ({ authenticatedPage: page }) => {
  await page.goto('/shop/new');
  await expect(page.getByTestId('input-name')).toBeVisible();
  await expect(page.getByTestId('input-description')).toBeVisible();
  await expect(page.getByTestId('input-location')).toBeVisible();
});
