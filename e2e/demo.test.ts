import { expect, test } from '@playwright/test';

test('home page has expected input elements', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('input-name')).toBeVisible();
  await expect(page.getByTestId('input-description')).toBeVisible();
  await expect(page.getByTestId('input-location')).toBeVisible();
});
