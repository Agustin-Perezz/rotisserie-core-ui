import { expect, test } from '@playwright/test';

test('New shop page', async ({ page }) => {
  await page.goto('/shop/new');
  await expect(page.getByTestId('input-name')).toBeVisible();
  await expect(page.getByTestId('input-description')).toBeVisible();
  await expect(page.getByTestId('input-location')).toBeVisible();
});
